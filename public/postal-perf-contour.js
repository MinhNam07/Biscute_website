/**
 * BISCUTE Post Office — perforated outer ink contour.
 * Boots as a custom element; upgrades SSR <postal-perf-contour> hosts.
 * Geometry mirrors .postal-frame --pf-pitch / --pf-hole edge punches.
 */
(function () {
  var TAG = "postal-perf-contour";
  if (typeof customElements === "undefined" || customElements.get(TAG)) return;

  function tileCenters(span, pitch) {
    if (span <= 0 || pitch <= 0) return [];
    var n = Math.ceil(span / pitch);
    var centers = [];
    for (var i = 0; i < n; i += 1) centers.push(i * pitch + pitch / 2);
    return centers;
  }

  function buildPerforationPath(w, h, pitch, r, bite) {
    if (w <= 0 || h <= 0 || pitch <= 0 || r <= 0) return "";
    var topY = bite;
    var rightX = w - bite;
    var bottomY = h - bite;
    var leftX = bite;
    var parts = ["M 0 0"];
    var x = 0;
    var y = 0;
    var i;
    var cx;
    var cy;
    var start;
    var end;
    var tops = tileCenters(w, pitch);
    var rights = tileCenters(h, pitch);

    for (i = 0; i < tops.length; i += 1) {
      cx = tops[i];
      if (cx < r || cx > w - r) continue;
      start = cx - r;
      end = cx + r;
      if (start > x) parts.push("L " + start + " " + topY);
      parts.push("A " + r + " " + r + " 0 0 0 " + end + " " + topY);
      x = end;
    }
    if (x < w) parts.push("L " + w + " " + topY);
    if (topY !== 0) parts.push("L " + w + " 0");

    y = 0;
    for (i = 0; i < rights.length; i += 1) {
      cy = rights[i];
      if (cy < r || cy > h - r) continue;
      start = cy - r;
      end = cy + r;
      if (start > y) parts.push("L " + rightX + " " + start);
      parts.push("A " + r + " " + r + " 0 0 0 " + rightX + " " + end);
      y = end;
    }
    if (y < h) parts.push("L " + rightX + " " + h);
    if (rightX !== w) parts.push("L " + w + " " + h);

    x = w;
    for (i = tops.length - 1; i >= 0; i -= 1) {
      cx = tops[i];
      if (cx < r || cx > w - r) continue;
      start = cx + r;
      end = cx - r;
      if (start < x) parts.push("L " + start + " " + bottomY);
      parts.push("A " + r + " " + r + " 0 0 0 " + end + " " + bottomY);
      x = end;
    }
    if (x > 0) parts.push("L 0 " + bottomY);
    if (bottomY !== h) parts.push("L 0 " + h);

    y = h;
    for (i = rights.length - 1; i >= 0; i -= 1) {
      cy = rights[i];
      if (cy < r || cy > h - r) continue;
      start = cy + r;
      end = cy - r;
      if (start < y) parts.push("L " + leftX + " " + start);
      parts.push("A " + r + " " + r + " 0 0 0 " + leftX + " " + end);
      y = end;
    }
    if (y > 0) parts.push("L " + leftX + " 0");
    parts.push("Z");
    return parts.join(" ");
  }

  function readGeometry(el) {
    var styles = getComputedStyle(el);
    var width = el.clientWidth;
    var height = el.clientHeight;
    var cqw = width / 100;
    var pitchTok = parseFloat(styles.getPropertyValue("--pf-pitch"));
    var pitch = isFinite(pitchTok)
      ? pitchTok
      : Math.min(36, Math.max(16, 3.55 * cqw));
    var holeTok = parseFloat(styles.getPropertyValue("--pf-hole"));
    var hole = isFinite(holeTok) ? holeTok : pitch * 0.31;
    var biteTok = parseFloat(styles.getPropertyValue("--pf-bite"));
    var bite = isFinite(biteTok) ? biteTok : 0;
    return { width: width, height: height, pitch: pitch, hole: hole, bite: bite };
  }

  function syncContour(host) {
    var frame = host.closest(".postal-frame");
    if (!frame) return;
    var geo = readGeometry(frame);
    if (geo.width <= 0 || geo.height <= 0) return;

    // Drop any leftover cast from older contour builds.
    var stale = frame.querySelector(".postal-frame__cast");
    if (stale) stale.remove();

    var svg = host.querySelector("svg");
    if (!svg) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("fill", "none");
      svg.setAttribute("preserveAspectRatio", "none");
      svg.setAttribute("aria-hidden", "true");
      svg.style.cssText =
        "position:absolute;inset:0;width:100%;height:100%;overflow:visible;display:block;";
      host.appendChild(svg);
    }

    var path = svg.querySelector("path");
    if (!path) {
      path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "currentColor");
      path.setAttribute("stroke-linejoin", "round");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("vector-effect", "non-scaling-stroke");
      svg.appendChild(path);
    }
    path.setAttribute("stroke-width", "2.5px");

    svg.setAttribute("viewBox", "0 0 " + geo.width + " " + geo.height);
    path.setAttribute(
      "d",
      buildPerforationPath(geo.width, geo.height, geo.pitch, geo.hole, geo.bite)
    );
  }

  class PostalPerfContourElement extends HTMLElement {
    connectedCallback() {
      var host = this;
      var frame = host.closest(".postal-frame");
      if (!frame) return;
      var run = function () {
        syncContour(host);
      };
      run();
      this._ro = new ResizeObserver(run);
      this._ro.observe(frame);
    }

    disconnectedCallback() {
      if (this._ro) this._ro.disconnect();
    }
  }

  customElements.define(TAG, PostalPerfContourElement);
})();
