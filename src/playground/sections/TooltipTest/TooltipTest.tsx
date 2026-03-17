import { Button, Overlay } from "@/components";
import { Focus, useRefManager } from "@lesnoypudge/utils-react";
import { FC, useEffect, useState } from "react";

export const TooltipTest: FC = () => {
  const buttonRef = useRefManager<HTMLButtonElement>(null);

  const [settings, setSettings] = useState({
    preferredAlignment: "right" as const,
    boundsSize: 20,
    centered: true,
    spacing: 20,
    unbounded: false,
    within: true,
    swappableAlignment: true,
    followMouse: false,
  });

  useEffect(() => {
    if (!settings.followMouse) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (buttonRef.current) {
        buttonRef.current.style.left = `${e.clientX}px`;
        buttonRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [settings, buttonRef]);

  return (
    <Focus.Lock>
      <div className="size-full">
        <div className="mb-4 flex flex-col gap-2">
          <label>
            preferredAlignment{": "}
            <select
              style={{ color: "black" }}
              value={settings.preferredAlignment}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  preferredAlignment: e.target.value as any,
                }))
              }
            >
              <option value="top">top</option>
              <option value="right">right</option>
              <option value="bottom">bottom</option>
              <option value="left">left</option>
            </select>
          </label>
          <label>
            boundsSize{": "}
            <input
              type="number"
              value={settings.boundsSize}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  boundsSize: Number(e.target.value),
                }))
              }
            />
          </label>
          <label>
            centered{": "}
            <input
              type="checkbox"
              checked={settings.centered}
              onChange={(e) =>
                setSettings((s) => ({ ...s, centered: e.target.checked }))
              }
            />
          </label>
          <label>
            spacing{": "}
            <input
              type="number"
              value={settings.spacing}
              onChange={(e) =>
                setSettings((s) => ({ ...s, spacing: Number(e.target.value) }))
              }
            />
          </label>
          <label>
            unbounded{": "}
            <input
              type="checkbox"
              checked={settings.unbounded}
              onChange={(e) =>
                setSettings((s) => ({ ...s, unbounded: e.target.checked }))
              }
            />
          </label>
          <label>
            swappableAlignment{": "}
            <input
              type="checkbox"
              checked={settings.swappableAlignment}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  swappableAlignment: e.target.checked,
                }))
              }
            />
          </label>
          <label>
            followMouse{": "}
            <input
              type="checkbox"
              checked={settings.followMouse}
              onChange={(e) =>
                setSettings((s) => ({ ...s, followMouse: e.target.checked }))
              }
            />
          </label>
        </div>

        <Button
          innerRef={buttonRef}
          className={
            settings.followMouse
              ? "fixed -translate-x-1/2 -translate-y-1/2"
              : ""
          }
          style={{
            border: "2px solid red",
            padding: "20px",
          }}
        >
          trigger
        </Button>

        <Overlay.Tooltip
          className="bg-white text-color-secondary"
          leaderElementRef={buttonRef}
          preferredAlignment={settings.preferredAlignment}
          boundsSize={settings.boundsSize}
          centered={settings.centered}
          spacing={settings.spacing}
          unbounded={settings.unbounded}
          within={settings.within}
          swappableAlignment={settings.swappableAlignment}
        >
          <>tooltip</>
        </Overlay.Tooltip>
      </div>
    </Focus.Lock>
  );
};
