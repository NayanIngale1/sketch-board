"use client"

import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react";
import { memo } from "react";
import { Rectangle } from "./rectangle";
import { Ellipse } from "./ellipse";
import { Text } from "./text";
import { Note } from "./note";
import { Path } from "./path";
import { colorToCss } from "@/lib/utils";

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
    case LayerType.Path:
      return <Path
        key={id}
        x={layer.x}
        y={layer.y}
        fill={layer.fill ? colorToCss(layer.fill) : "#000"}
        points={layer.points}
        onPointerDown={(e) => onLayerPointerDown(e, id)}
        stroke={selecetionColor}
      />
    case LayerType.Ellipse:
      return <Ellipse
        id={id}
        layer={layer}
        onPointerDown={onLayerPointerDown}
        selectionColor={selecetionColor}
      />
    case LayerType.Text:
      return <Text
        id={id}
        layer={layer}
        onPointerDown={onLayerPointerDown}
        selectionColor={selecetionColor}
      />
    case LayerType.Note:
      return <Note
        id={id}
        layer={layer}
        onPointerDown={onLayerPointerDown}
        selectionColor={selecetionColor}
      />
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