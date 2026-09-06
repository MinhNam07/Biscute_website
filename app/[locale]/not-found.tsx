"use client";

import { MascotState } from "@/components/mascot/mascot-state";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { GeometricDecoration } from "@/components/brand/geometric-decoration";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center gap-6 bg-biscute-pale-pink py-24 text-center">
      <GeometricDecoration shape="circle" color="pink" size="lg" className="left-8 top-8 opacity-30" />
      <GeometricDecoration shape="square" color="deep" size="lg" rotate className="bottom-8 right-8 opacity-30" />
      <MascotState variant="error" />
      <h1 className="type-display">404</h1>
      <p className="type-body text-biscute-chocolate/80">Page not found</p>
      <Button variant="secondary" asChild>
        <Link href="/">Go home</Link>
      </Button>
    </div>
  );
}
