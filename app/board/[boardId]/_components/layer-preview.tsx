"use client"

import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react";
import { memo } from "react";
import { Rectangle } from "./rectangle";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selecetionColor?: string;
}

export const LayerPreview = memo(({
  id,
  onLayerPointerDown,
  selecetionColor
}: LayerPreviewProps) => {

  const layer = useStorage((root) => root.layers.get(id))

  if (!layer) {
    return null;
  }


  switch (layer.type) {
    case LayerType.Rectangle:
      return <Rectangle
        id={id}
        layer={layer}
        onPointerDown={onLayerPointerDown}
        selectionColor={selecetionColor}
      />;
    default:
      console.warn("Layer type not supported");
  }
});

LayerPreview.displayName = "LayerPreview"