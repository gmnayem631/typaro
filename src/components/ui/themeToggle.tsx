"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  if (!mounted) return <div className="switch-placeholder" />;

  const isDark = resolvedTheme === "dark";

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <>
      <style>{`
        .switch-wrap {
          transform: scale(0.7);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 150px;
          height: 65px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.5s ease;
          background: linear-gradient(to bottom, #73bbff, #a2d1fd);
        }
        .switch-wrap::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50px;
          opacity: 0;
          background: linear-gradient(to top, #2b3347, #181d27);
          transition: all 0.5s ease;
        }
        .switch-wrap.dark::before {
          opacity: 1;
        }
        .switch-border {
          position: absolute;
          top: -2px;
          left: -2px;
          width: calc(100% + 4px);
          height: calc(100% + 4px);
          border-radius: 50px;
          background: linear-gradient(to bottom, #a2d1fd, #cde7ff);
          z-index: -1;
          transition: all 0.5s ease;
        }
        .switch-border::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          border-radius: 50px;
          background: linear-gradient(to bottom, #000000, #6c7384);
          opacity: 0;
          transition: all 0.5s ease;
        }
        .switch-wrap.dark .switch-border::after {
          opacity: 1;
        }
        .sunmoon {
          position: absolute;
          width: 55px;
          height: 55px;
          border-radius: 50%;
          transition: all 0.5s ease;
          left: 5px;
          z-index: 1;
          background-color: #FFC187;
          box-shadow: 0px 0px 11.7px 0px #FFC187, 0px 0px 20px 0px #ffc18768, -2px -2px 5px 0px #ffab5c inset;
        }
        .switch-wrap.dark .sunmoon {
          left: calc(100% - 55px - 5px);
          background-color: #dee5f3;
          box-shadow: 0px 0px 51.7px 0px #dee5f3;
        }
        .darkside {
          position: absolute;
          top: 2px; left: 2px;
          width: 75%; height: 75%;
          border-radius: 50%;
          background-color: #FFC187;
          transition: all 0.5s ease;
        }
        .switch-wrap.dark .darkside {
          background-color: #565c6b;
        }
        .clouds-wrap {
          border-radius: 50px;
          position: relative;
          height: 100%;
          width: 100%;
          overflow: hidden;
        }
        .cloud {
          position: absolute;
          width: 60%;
          transition: all 0.5s ease;
        }
        .cloud-1 { bottom: -55%; left: 0; }
        .cloud-2 { bottom: -45%; left: 25px; }
        .cloud-3 { bottom: -40%; right: 0px; }
        .cloud-4 { bottom: -16%; right: -25px; }
        .switch-wrap.dark .cloud-1 { bottom: -35%; left: -110px; }
        .switch-wrap.dark .cloud-2 { bottom: -15%; left: -110px; transition: all 0.7s ease; }
        .switch-wrap.dark .cloud-3 { bottom: -15%; right: -110px; }
        .switch-wrap.dark .cloud-4 { bottom: -5%; right: -110px; transition: all 0.7s ease; }
        .stars {
          position: absolute;
          top: 150%;
          left: 0;
          transform: translateY(-50%);
          pointer-events: none;
          transition: all 0.5s ease;
        }
        .switch-wrap.dark .stars {
          top: 50%;
        }
        .switch-placeholder {
          width: 150px;
          height: 65px;
        }
      `}</style>
      {/* prettier-ignore */}
      <button
        onClick={toggle}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={`switch-wrap${isDark ? " dark" : ""}`}
      >
        {/* Sun / Moon orb */}
        <div className="sunmoon">
          <div className="darkside" />
        </div>

        {/* Gradient border ring */}
        <div className="switch-border" />

        {/* Clouds + stars layer */}
        <div className="clouds-wrap">
          {/* Cloud 1 */}
          <svg
            className="cloud cloud-1"
            width="88"
            height="50"
            viewBox="0 0 88 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.95">
              <circle
                cx="15.0573"
                cy="26.1517"
                r="13.65"
                transform="rotate(-3.84411 15.0573 26.1517)"
                fill="white"
              />
              <circle
                cx="33.9905"
                cy="17.0619"
                r="13.65"
                transform="rotate(-3.84411 33.9905 17.0619)"
                fill="white"
              />
              <circle
                cx="35.0364"
                cy="32.6268"
                r="13.65"
                transform="rotate(-3.84411 35.0364 32.6268)"
                fill="white"
              />
              <circle
                cx="51.1139"
                cy="19.8201"
                r="13.65"
                transform="rotate(-3.84411 51.1139 19.8201)"
                fill="white"
              />
              <circle
                cx="58.4709"
                cy="32.3551"
                r="13.65"
                transform="rotate(-3.84411 58.4709 32.3551)"
                fill="white"
              />
              <circle
                cx="72.1287"
                cy="22.3169"
                r="13.65"
                transform="rotate(-3.84411 72.1287 22.3169)"
                fill="white"
              />
            </g>
          </svg>

          {/* Cloud 2 */}
          <svg
            className="cloud cloud-2"
            width="88"
            height="51"
            viewBox="0 0 88 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.6">
              <circle
                cx="15.3241"
                cy="27.0558"
                r="13.65"
                transform="rotate(-4.59401 15.3241 27.0558)"
                fill="white"
              />
              <circle
                cx="34.1368"
                cy="17.719"
                r="13.65"
                transform="rotate(-4.59401 34.1368 17.719)"
                fill="white"
              />
              <circle
                cx="35.3863"
                cy="33.2689"
                r="13.65"
                transform="rotate(-4.59401 35.3863 33.2689)"
                fill="white"
              />
              <circle
                cx="51.2948"
                cy="20.2529"
                r="13.65"
                transform="rotate(-4.59401 51.2948 20.2529)"
                fill="white"
              />
              <circle
                cx="58.8152"
                cy="32.6905"
                r="13.65"
                transform="rotate(-4.59401 58.8152 32.6905)"
                fill="white"
              />
              <circle
                cx="72.3404"
                cy="22.4744"
                r="13.65"
                transform="rotate(-4.59401 72.3404 22.4744)"
                fill="white"
              />
            </g>
          </svg>

          {/* Cloud 3 */}
          <svg
            className="cloud cloud-3"
            width="88"
            height="50"
            viewBox="0 0 88 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.95">
              <circle
                cx="15.0574"
                cy="26.1517"
                r="13.65"
                transform="rotate(-3.84411 15.0574 26.1517)"
                fill="white"
              />
              <circle
                cx="33.9905"
                cy="17.0619"
                r="13.65"
                transform="rotate(-3.84411 33.9905 17.0619)"
                fill="white"
              />
              <circle
                cx="35.0364"
                cy="32.6268"
                r="13.65"
                transform="rotate(-3.84411 35.0364 32.6268)"
                fill="white"
              />
              <circle
                cx="51.114"
                cy="19.8201"
                r="13.65"
                transform="rotate(-3.84411 51.114 19.8201)"
                fill="white"
              />
              <circle
                cx="58.4709"
                cy="32.3551"
                r="13.65"
                transform="rotate(-3.84411 58.4709 32.3551)"
                fill="white"
              />
              <circle
                cx="72.1287"
                cy="22.3169"
                r="13.65"
                transform="rotate(-3.84411 72.1287 22.3169)"
                fill="white"
              />
            </g>
          </svg>

          {/* Cloud 4 */}
          <svg
            className="cloud cloud-4"
            width="88"
            height="50"
            viewBox="0 0 88 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.6">
              <circle
                cx="15.0574"
                cy="26.1517"
                r="13.65"
                transform="rotate(-3.84411 15.0574 26.1517)"
                fill="white"
              />
              <circle
                cx="33.9906"
                cy="17.0619"
                r="13.65"
                transform="rotate(-3.84411 33.9906 17.0619)"
                fill="white"
              />
              <circle
                cx="35.0364"
                cy="32.6268"
                r="13.65"
                transform="rotate(-3.84411 35.0364 32.6268)"
                fill="white"
              />
              <circle
                cx="51.1141"
                cy="19.8201"
                r="13.65"
                transform="rotate(-3.84411 51.1141 19.8201)"
                fill="white"
              />
              <circle
                cx="58.471"
                cy="32.3551"
                r="13.65"
                transform="rotate(-3.84411 58.471 32.3551)"
                fill="white"
              />
              <circle
                cx="72.1287"
                cy="22.3169"
                r="13.65"
                transform="rotate(-3.84411 72.1287 22.3169)"
                fill="white"
              />
            </g>
          </svg>

          {/* Stars */}
          <svg
            className="stars"
            width="80"
            height="52"
            viewBox="0 0 80 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.35 13L12.8767 14.4233L14.3 14.95L12.8767 15.4767L12.35 16.9L11.8233 15.4767L10.4 14.95L11.8233 14.4233L12.35 13Z"
              fill="#DEE5F3"
            />
            <path
              d="M35.75 23.4L36.2767 24.8233L37.7 25.35L36.2767 25.8767L35.75 27.3L35.2233 25.8767L33.8 25.35L35.2233 24.8233L35.75 23.4Z"
              fill="#DEE5F3"
            />
            <path
              d="M17.55 46.8L18.0767 48.2233L19.5 48.75L18.0767 49.2767L17.55 50.7L17.0233 49.2767L15.6 48.75L17.0233 48.2233L17.55 46.8Z"
              fill="#DEE5F3"
            />
            <path
              d="M24.05 27.3L24.2256 27.7744L24.7 27.95L24.2256 28.1256L24.05 28.6L23.8745 28.1256L23.4 27.95L23.8745 27.7744L24.05 27.3Z"
              fill="#DEE5F3"
            />
            <path
              d="M13.65 36.4L13.8256 36.8744L14.3 37.05L13.8256 37.2256L13.65 37.7L13.4744 37.2256L13 37.05L13.4744 36.8744L13.65 36.4Z"
              fill="#DEE5F3"
            />
            <path
              d="M28.275 49.4L28.5383 50.1117L29.25 50.375L28.5383 50.6383L28.275 51.35L28.0116 50.6383L27.3 50.375L28.0116 50.1117L28.275 49.4Z"
              fill="#DEE5F3"
            />
            <path
              d="M5.85001 42.9L6.02557 43.3744L6.50001 43.55L6.02557 43.7256L5.85001 44.2L5.67445 43.7256L5.20001 43.55L5.67445 43.3744L5.85001 42.9Z"
              fill="#DEE5F3"
            />
            <path
              d="M38.35 40.3L38.5256 40.7744L39 40.95L38.5256 41.1256L38.35 41.6L38.1745 41.1256L37.7 40.95L38.1745 40.7744L38.35 40.3Z"
              fill="#DEE5F3"
            />
            <path
              d="M26.65 6.5L26.8256 6.97444L27.3 7.15L26.8256 7.32556L26.65 7.8L26.4744 7.32556L26 7.15L26.4744 6.97444L26.65 6.5Z"
              fill="#DEE5F3"
            />
            <path
              d="M0.65 27.3L0.825559 27.7744L1.3 27.95L0.825559 28.1256L0.65 28.6L0.474441 28.1256L0 27.95L0.474441 27.7744L0.65 27.3Z"
              fill="#DEE5F3"
            />
            <path
              d="M46.15 0L46.6767 1.42332L48.1 1.95L46.6767 2.47668L46.15 3.9L45.6233 2.47668L44.2 1.95L45.6233 1.42332L46.15 0Z"
              fill="#DEE5F3"
            />
            <path
              d="M76.05 13L76.5767 14.4233L78 14.95L76.5767 15.4767L76.05 16.9L75.5233 15.4767L74.1 14.95L75.5233 14.4233L76.05 13Z"
              fill="#DEE5F3"
            />
            <path
              d="M57.85 42.9L58.3767 44.3233L59.8 44.85L58.3767 45.3767L57.85 46.8L57.3233 45.3767L55.9 44.85L57.3233 44.3233L57.85 42.9Z"
              fill="#DEE5F3"
            />
            <path
              d="M64.35 16.9L64.5256 17.3744L65 17.55L64.5256 17.7256L64.35 18.2L64.1745 17.7256L63.7 17.55L64.1745 17.3744L64.35 16.9Z"
              fill="#DEE5F3"
            />
            <path
              d="M59.15 31.2L59.3256 31.6744L59.8 31.85L59.3256 32.0256L59.15 32.5L58.9744 32.0256L58.5 31.85L58.9744 31.6744L59.15 31.2Z"
              fill="#DEE5F3"
            />
            <path
              d="M65.975 24.7L66.2383 25.4117L66.95 25.675L66.2383 25.9383L65.975 26.65L65.7117 25.9383L65 25.675L65.7117 25.4117L65.975 24.7Z"
              fill="#DEE5F3"
            />
            <path
              d="M78.65 29.9L78.8256 30.3744L79.3 30.55L78.8256 30.7256L78.65 31.2L78.4744 30.7256L78 30.55L78.4744 30.3744L78.65 29.9Z"
              fill="#DEE5F3"
            />
            <path
              d="M72.15 3.89999L72.3256 4.37443L72.8 4.54999L72.3256 4.72555L72.15 5.19999L71.9744 4.72555L71.5 4.54999L71.9744 4.37443L72.15 3.89999Z"
              fill="#DEE5F3"
            />
            <path
              d="M40.95 16.9L41.1255 17.3744L41.6 17.55L41.1255 17.7256L40.95 18.2L40.7744 17.7256L40.3 17.55L40.7744 17.3744L40.95 16.9Z"
              fill="#DEE5F3"
            />
          </svg>
        </div>
      </button>
    </>
  );
}
