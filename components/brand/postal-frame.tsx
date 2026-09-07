import type { ReactNode } from "react";

import { PostalPerforationContour } from "@/components/brand/postal-perforation-contour";
import { WmLotus, WmLotusSm, WmTower } from "@/components/brand/postal-watermarks";
import { cn } from "@/lib/utils";
import "./postal-frame.css";

type PostalFrameProps = {
  children?: ReactNode;
  airmailLine?: string;
  /** @deprecated Seal is now a fixed Vietnam stamp asset. */
  postmarkPlace?: string;
  /** @deprecated Seal is now a fixed Vietnam stamp asset. */
  postmarkCountry?: string;
  /** @deprecated No longer used by the seal graphic. */
  uid?: string;
  /** `card` = fixed postcard ratio; `sheet` = content-tall stamp hunt. */
  layout?: "card" | "sheet";
  className?: string;
};

/** Vietnam rubber-stamp seal (asset replaces the old Hanoi cancel + spray). */
function Postmark() {
  return (
    <span className="postal-frame__postmark" aria-hidden>
      <img
        className="postal-frame__postmark-img"
        src="/textures/post-office-postmark-vietnam.svg"
        alt=""
        draggable={false}
      />
    </span>
  );
}

/**
 * BISCUTE POST OFFICE souvenir sheet, rebuilt as live markup:
 * cream perforated stamp paper + perforated ink contour + thin ink rim +
 * engraved watermarks + chrome. `children` render inside the sheet well.
 *
 * Layering: cream perforated paper → clipped face (rim + prints + chrome + content)
 * → outer contour stroke.
 */
export function PostalFrame({
  children,
  airmailLine = "AIR MAIL · BISCUTE · HANOI",
  layout = "card",
  className,
}: PostalFrameProps) {
  return (
    <div
      className={cn(
        "postal-frame",
        layout === "sheet" && "postal-frame--sheet",
        className
      )}
    >
      <div className="postal-frame__paper">
        <span className="postal-frame__grain" aria-hidden />

        {/* Face is clipped to the straight ink rectangle — prints/chrome/content
            must not bleed into the perforated paper gutter. */}
        <div className="postal-frame__face">
          <span className="postal-frame__rim" aria-hidden />

          <WmLotus className="postal-frame__print postal-frame__print--lotus" />
          <WmLotusSm className="postal-frame__print postal-frame__print--lotus-sm" />
          <WmTower className="postal-frame__print postal-frame__print--tower" />

          <div className="postal-frame__chrome-left">
            <p className="postal-frame__airmail">{airmailLine}</p>
          </div>
          <div className="postal-frame__chrome-right">
            <Postmark />
          </div>

          {children ? (
            <div className="postal-frame__content">{children}</div>
          ) : null}
        </div>
      </div>

      {/* Sibling overlay: stroke on the cut edge without paper-mask clipping */}
      <PostalPerforationContour />
    </div>
  );
}
