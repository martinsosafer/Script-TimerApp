import * as React from "react";

import { cn } from "../../lib/utils";

type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  complete: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <rect x="4" y="3" width="12" height="2" rx="1" fill="currentColor"></rect>
      <rect x="4" y="7" width="12" height="2" rx="1" fill="currentColor"></rect>
      <rect x="4" y="11" width="3" height="2" rx="1" fill="currentColor"></rect>
      <rect x="4" y="15" width="3" height="2" rx="1" fill="currentColor"></rect>
      <rect
        x="8.5"
        y="11"
        width="3"
        height="2"
        rx="1"
        fill="currentColor"
      ></rect>
      <rect
        x="8.5"
        y="15"
        width="3"
        height="2"
        rx="1"
        fill="currentColor"
      ></rect>
      <rect
        x="13"
        y="11"
        width="3"
        height="2"
        rx="1"
        fill="currentColor"
      ></rect>
    </svg>
  ),
  insert: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.491 7.769a.888.888 0 0 1 .287.648.888.888 0 0 1-.287.648l-3.916 3.667a1.013 1.013 0 0 1-.692.268c-.26 0-.509-.097-.692-.268L5.275 9.065A.886.886 0 0 1 5 8.42a.889.889 0 0 1 .287-.64c.181-.17.427-.267.683-.269.257-.002.504.09.69.258L8.903 9.87V3.917c0-.243.103-.477.287-.649.183-.171.432-.268.692-.268.26 0 .509.097.692.268a.888.888 0 0 1 .287.649V9.87l2.245-2.102c.183-.172.432-.269.692-.269.26 0 .508.097.692.269Z"
        fill="currentColor"
      ></path>
      <rect x="4" y="15" width="3" height="2" rx="1" fill="currentColor"></rect>
      <rect
        x="8.5"
        y="15"
        width="3"
        height="2"
        rx="1"
        fill="currentColor"
      ></rect>
      <rect
        x="13"
        y="15"
        width="3"
        height="2"
        rx="1"
        fill="currentColor"
      ></rect>
    </svg>
  ),
  logo: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <rect width="256" height="256" fill="none" />
      <line
        x1="208"
        y1="128"
        x2="128"
        y2="208"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        x1="192"
        y1="40"
        x2="40"
        y2="192"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  ),
  twitter: (props: IconProps) => (
    <svg
      {...props}
      height="23"
      viewBox="0 0 1200 1227"
      width="23"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
    </svg>
  ),
  gitHub: (props: IconProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
  radix: (props: IconProps) => (
    <svg viewBox="0 0 25 25" fill="none" {...props}>
      <path
        d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"
        fill="currentcolor"
      ></path>
      <path d="M12 0H4V8H12V0Z" fill="currentcolor"></path>
      <path
        d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"
        fill="currentcolor"
      ></path>
    </svg>
  ),
  aria: (props: IconProps) => (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm15.116 0h-8.884L24 22.624Z" />
    </svg>
  ),
  npm: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"
        fill="currentColor"
      />
    </svg>
  ),
  yarn: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm.768 4.105c.183 0 .363.053.525.157.125.083.287.185.755 1.154.31-.088.468-.042.551-.019.204.056.366.19.463.375.477.917.542 2.553.334 3.605-.241 1.232-.755 2.029-1.131 2.576.324.329.778.899 1.117 1.825.278.774.31 1.478.273 2.015a5.51 5.51 0 0 0 .602-.329c.593-.366 1.487-.917 2.553-.931.714-.009 1.269.445 1.353 1.103a1.23 1.23 0 0 1-.945 1.362c-.649.158-.95.278-1.821.843-1.232.797-2.539 1.242-3.012 1.39a1.686 1.686 0 0 1-.704.343c-.737.181-3.266.315-3.466.315h-.046c-.783 0-1.214-.241-1.45-.491-.658.329-1.51.19-2.122-.134a1.078 1.078 0 0 1-.58-1.153 1.243 1.243 0 0 1-.153-.195c-.162-.25-.528-.936-.454-1.946.056-.723.556-1.367.88-1.71a5.522 5.522 0 0 1 .408-2.256c.306-.727.885-1.348 1.32-1.737-.32-.537-.644-1.367-.329-2.21.227-.602.412-.936.82-1.08h-.005c.199-.074.389-.153.486-.259a3.418 3.418 0 0 1 2.298-1.103c.037-.093.079-.185.125-.283.31-.658.639-1.029 1.024-1.168a.94.94 0 0 1 .328-.06zm.006.7c-.507.016-1.001 1.519-1.001 1.519s-1.27-.204-2.266.871c-.199.218-.468.334-.746.44-.079.028-.176.023-.417.672-.371.991.625 2.094.625 2.094s-1.186.839-1.626 1.881c-.486 1.144-.338 2.261-.338 2.261s-.843.732-.899 1.487c-.051.663.139 1.2.343 1.515.227.343.51.176.51.176s-.561.653-.037.931c.477.25 1.283.394 1.71-.037.31-.31.371-1.001.486-1.283.028-.065.12.111.209.199.097.093.264.195.264.195s-.755.324-.445 1.066c.102.246.468.403 1.066.398.222-.005 2.664-.139 3.313-.296.375-.088.505-.283.505-.283s1.566-.431 2.998-1.357c.917-.598 1.293-.76 2.034-.936.612-.148.57-1.098-.241-1.084-.839.009-1.575.44-2.196.825-1.163.718-1.742.672-1.742.672l-.018-.032c-.079-.13.371-1.293-.134-2.678-.547-1.515-1.413-1.881-1.344-1.997.297-.5 1.038-1.297 1.334-2.78.176-.899.13-2.377-.269-3.151-.074-.144-.732.241-.732.241s-.616-1.371-.788-1.483a.271.271 0 0 0-.157-.046z"
        fill="currentColor"
      />
    </svg>
  ),
  pnpm: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z"
        fill="currentColor"
      />
    </svg>
  ),
  react: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"
        fill="currentColor"
      />
    </svg>
  ),
  tailwind: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"
        fill="currentColor"
      />
    </svg>
  ),
  google: (props: IconProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
      />
    </svg>
  ),
  apple: (props: IconProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
        fill="currentColor"
      />
    </svg>
  ),
  paypal: (props: IconProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"
        fill="currentColor"
      />
    </svg>
  ),
  spinner: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  SoundLibrary: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15V6" />
      <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      <path d="M12 12H3" />
      <path d="M16 6H3" />
      <path d="M12 18H3" />
    </svg>
  ),
};

function IconNextChat({
  className,
  inverted,
  ...props
}: React.ComponentProps<"svg"> & { inverted?: boolean }) {
  const id = React.useId();

  return (
    <svg
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <defs>
        <linearGradient
          id={`gradient-${id}-1`}
          x1="10.6889"
          y1="10.3556"
          x2="13.8445"
          y2="14.2667"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={inverted ? "white" : "black"} />
          <stop
            offset={1}
            stopColor={inverted ? "white" : "black"}
            stopOpacity={0}
          />
        </linearGradient>
        <linearGradient
          id={`gradient-${id}-2`}
          x1="11.7555"
          y1="4.8"
          x2="11.7376"
          y2="9.50002"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={inverted ? "white" : "black"} />
          <stop
            offset={1}
            stopColor={inverted ? "white" : "black"}
            stopOpacity={0}
          />
        </linearGradient>
      </defs>
      <path
        d="M1 16L2.58314 11.2506C1.83084 9.74642 1.63835 8.02363 2.04013 6.39052C2.4419 4.75741 3.41171 3.32057 4.776 2.33712C6.1403 1.35367 7.81003 0.887808 9.4864 1.02289C11.1628 1.15798 12.7364 1.8852 13.9256 3.07442C15.1148 4.26363 15.842 5.83723 15.9771 7.5136C16.1122 9.18997 15.6463 10.8597 14.6629 12.224C13.6794 13.5883 12.2426 14.5581 10.6095 14.9599C8.97637 15.3616 7.25358 15.1692 5.74942 14.4169L1 16Z"
        fill={inverted ? "black" : "white"}
        stroke={inverted ? "black" : "white"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask
        id="mask0_91_2047"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x={1}
        y={0}
        width={16}
        height={16}
      >
        <circle cx={9} cy={8} r={8} fill={inverted ? "black" : "white"} />
      </mask>
      <g mask="url(#mask0_91_2047)">
        <circle cx={9} cy={8} r={8} fill={inverted ? "black" : "white"} />
        <path
          d="M14.2896 14.0018L7.146 4.8H5.80005V11.1973H6.87681V6.16743L13.4444 14.6529C13.7407 14.4545 14.0231 14.2369 14.2896 14.0018Z"
          fill={`url(#gradient-${id}-1)`}
        />
        <rect
          x="11.2222"
          y="4.8"
          width="1.06667"
          height="6.4"
          fill={`url(#gradient-${id}-2)`}
        />
      </g>
    </svg>
  );
}

function IconOpenAI({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <title>OpenAI icon</title>
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  );
}

function IconVercel({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-label="Vercel logomark"
      role="img"
      viewBox="0 0 74 64"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path
        d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

function IconGitHub({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <title>GitHub</title>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function IconSeparator({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="none"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M16.88 3.549L7.12 20.451"></path>
    </svg>
  );
}

function IconArrowDown({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="m205.66 149.66-72 72a8 8 0 0 1-11.32 0l-72-72a8 8 0 0 1 11.32-11.32L120 196.69V40a8 8 0 0 1 16 0v156.69l58.34-58.35a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  );
}

function IconArrowRight({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="m221.66 133.66-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z" />
    </svg>
  );
}

function IconUser({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z" />
    </svg>
  );
}

function IconPlus({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8Z" />
    </svg>
  );
}

function IconArrowElbow({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M200 32v144a8 8 0 0 1-8 8H67.31l34.35 34.34a8 8 0 0 1-11.32 11.32l-48-48a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 11.32L67.31 168H184V32a8 8 0 0 1 16 0Z" />
    </svg>
  );
}

function IconSpinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4 animate-spin", className)}
      {...props}
    >
      <path d="M232 128a104 104 0 0 1-208 0c0-41 23.81-78.36 60.66-95.27a8 8 0 0 1 6.68 14.54C60.15 61.59 40 93.27 40 128a88 88 0 0 0 176 0c0-34.73-20.15-66.41-51.34-80.73a8 8 0 0 1 6.68-14.54C208.19 49.64 232 87 232 128Z" />
    </svg>
  );
}

function IconMessage({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M216 48H40a16 16 0 0 0-16 16v160a15.84 15.84 0 0 0 9.25 14.5A16.05 16.05 0 0 0 40 240a15.89 15.89 0 0 0 10.25-3.78.69.69 0 0 0 .13-.11L82.5 208H216a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16ZM40 224Zm176-32H82.5a16 16 0 0 0-10.3 3.75l-.12.11L40 224V64h176Z" />
    </svg>
  );
}

function IconMessageFull({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M13 8H7" />
      <path d="M17 12H7" />
    </svg>
  );
}

function IconTrash({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z" />
    </svg>
  );
}

function IconRefresh({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M197.67 186.37a8 8 0 0 1 0 11.29C196.58 198.73 170.82 224 128 224c-37.39 0-64.53-22.4-80-39.85V208a8 8 0 0 1-16 0v-48a8 8 0 0 1 8-8h48a8 8 0 0 1 0 16H55.44C67.76 183.35 93 208 128 208c36 0 58.14-21.46 58.36-21.68a8 8 0 0 1 11.31.05ZM216 40a8 8 0 0 0-8 8v23.85C192.53 54.4 165.39 32 128 32c-42.82 0-68.58 25.27-69.66 26.34a8 8 0 0 0 11.3 11.34C69.86 69.46 92 48 128 48c35 0 60.24 24.65 72.56 40H168a8 8 0 0 0 0 16h48a8 8 0 0 0 8-8V48a8 8 0 0 0-8-8Z" />
    </svg>
  );
}

function IconStop({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm24-120h-48a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h48a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8Zm-8 48h-32v-32h32Z" />
    </svg>
  );
}
function PencilIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      id="Pencil_24"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      {...props}
    >
      <rect width="24" height="24" stroke="none" fill="none" />
      <g transform="matrix(1.05 0 0 1.05 12 12)">
        <path
          style={{
            fill: "currentColor",
          }}
          transform="translate(-12.5, -11.5)"
          d="M 18.414062 2 C 18.158188 2 17.902031 2.0974687 17.707031 2.2929688 L 16 4 L 20 8 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.925594 2.0974687 18.669937 2 18.414062 2 z M 14.5 5.5 L 5 15 C 5 15 6.005 15.005 6.5 15.5 C 6.995 15.995 6.984375 16.984375 6.984375 16.984375 C 6.984375 16.984375 8.004 17.004 8.5 17.5 C 8.996 17.996 9 19 9 19 L 18.5 9.5 L 14.5 5.5 z M 3.6699219 17 L 3 21 L 7 20.330078 L 3.6699219 17 z"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
function CorrectDocumentIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      id="Correct_Document_24"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      {...props}
    >
      <rect width="24" height="24" stroke="none" fill="none" opacity="0" />
      <g transform="matrix(0.91 0 0 0.91 12 12)">
        <path
          style={{
            fill: "currentColor",
          }}
          transform="translate(-14, -13)"
          d="M 6 2 C 4.9057453 2 4 2.9057453 4 4 L 4 20 C 4 21.094255 4.9057453 22 6 22 L 11 22 L 11 20 L 6 20 L 6 4 L 13 4 L 13 9 L 18 9 L 18 11 L 20 11 L 20 8 L 14 2 L 6 2 z M 18 13 L 18 16 L 16.5 16 C 15.130937 16 14 17.130937 14 18.5 L 14 21 C 14 21.56503 13.56503 22 13 22 L 13 24 L 21 24 C 22.64497 24 24 22.64497 24 21 L 24 18.5 C 24 17.130937 22.869063 16 21.5 16 L 20 16 L 20 13 L 18 13 z M 16 20 L 22 20 L 22 21 C 22 21.56503 21.56503 22 21 22 L 15.583984 22 C 15.721014 21.657986 16 21.388348 16 21 L 16 20 z"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
function IconSidebar({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16ZM40 56h40v144H40Zm176 144H96V56h120v144Z" />
    </svg>
  );
}

function ShareIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M20 9L12 2 12 10M12 2L12 22M12 22L4 15L12 22Z" />
    </svg>
  );
}
function IconMoon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M233.54 142.23a8 8 0 0 0-8-2 88.08 88.08 0 0 1-109.8-109.8 8 8 0 0 0-10-10 104.84 104.84 0 0 0-52.91 37A104 104 0 0 0 136 224a103.09 103.09 0 0 0 62.52-20.88 104.84 104.84 0 0 0 37-52.91 8 8 0 0 0-1.98-7.98Zm-44.64 48.11A88 88 0 0 1 65.66 67.11a89 89 0 0 1 31.4-26A106 106 0 0 0 96 56a104.11 104.11 0 0 0 104 104 106 106 0 0 0 14.92-1.06 89 89 0 0 1-26.02 31.4Z" />
    </svg>
  );
}

function IconSun({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M120 40V16a8 8 0 0 1 16 0v24a8 8 0 0 1-16 0Zm72 88a64 64 0 1 1-64-64 64.07 64.07 0 0 1 64 64Zm-16 0a48 48 0 1 0-48 48 48.05 48.05 0 0 0 48-48ZM58.34 69.66a8 8 0 0 0 11.32-11.32l-16-16a8 8 0 0 0-11.32 11.32Zm0 116.68-16 16a8 8 0 0 0 11.32 11.32l16-16a8 8 0 0 0-11.32-11.32ZM192 72a8 8 0 0 0 5.66-2.34l16-16a8 8 0 0 0-11.32-11.32l-16 16A8 8 0 0 0 192 72Zm5.66 114.34a8 8 0 0 0-11.32 11.32l16 16a8 8 0 0 0 11.32-11.32ZM48 128a8 8 0 0 0-8-8H16a8 8 0 0 0 0 16h24a8 8 0 0 0 8-8Zm80 80a8 8 0 0 0-8 8v24a8 8 0 0 0 16 0v-24a8 8 0 0 0-8-8Zm112-88h-24a8 8 0 0 0 0 16h24a8 8 0 0 0 0-16Z" />
    </svg>
  );
}

function IconCopy({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8Zm-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z" />
    </svg>
  );
}

function IconCheck({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  );
}

function IconDownload({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M224 152v56a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16v-56a8 8 0 0 1 16 0v56h160v-56a8 8 0 0 1 16 0Zm-101.66 5.66a8 8 0 0 0 11.32 0l40-40a8 8 0 0 0-11.32-11.32L136 132.69V40a8 8 0 0 0-16 0v92.69l-26.34-26.35a8 8 0 0 0-11.32 11.32Z" />
    </svg>
  );
}

function IconClose({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={4}
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128 50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z" />
    </svg>
  );
}

function IconEdit({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  );
}

function IconArrowShare({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="m237.66 106.35-80-80A8 8 0 0 0 144 32v40.35c-25.94 2.22-54.59 14.92-78.16 34.91-28.38 24.08-46.05 55.11-49.76 87.37a12 12 0 0 0 20.68 9.58c11-11.71 50.14-48.74 107.24-52V192a8 8 0 0 0 13.66 5.65l80-80a8 8 0 0 0 0-11.3ZM160 172.69V144a8 8 0 0 0-8-8c-28.08 0-55.43 7.33-81.29 21.8a196.17 196.17 0 0 0-36.57 26.52c5.8-23.84 20.42-46.51 42.05-64.86C99.41 99.77 127.75 88 152 88a8 8 0 0 0 8-8V51.32L220.69 112Z" />
    </svg>
  );
}

function IconUsers({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M117.25 157.92a60 60 0 1 0-66.5 0 95.83 95.83 0 0 0-47.22 37.71 8 8 0 1 0 13.4 8.74 80 80 0 0 1 134.14 0 8 8 0 0 0 13.4-8.74 95.83 95.83 0 0 0-47.22-37.71ZM40 108a44 44 0 1 1 44 44 44.05 44.05 0 0 1-44-44Zm210.14 98.7a8 8 0 0 1-11.07-2.33A79.83 79.83 0 0 0 172 168a8 8 0 0 1 0-16 44 44 0 1 0-16.34-84.87 8 8 0 1 1-5.94-14.85 60 60 0 0 1 55.53 105.64 95.83 95.83 0 0 1 47.22 37.71 8 8 0 0 1-2.33 11.07Z" />
    </svg>
  );
}

function IconExternalLink({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M224 104a8 8 0 0 1-16 0V59.32l-66.33 66.34a8 8 0 0 1-11.32-11.32L196.68 48H152a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8Zm-40 24a8 8 0 0 0-8 8v72H48V80h72a8 8 0 0 0 0-16H48a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-72a8 8 0 0 0-8-8Z" />
    </svg>
  );
}
function IconPlay({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M64 448l384-192L64 64v384z" />
    </svg>
  );
}

function IconChevronUpDown({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M181.66 170.34a8 8 0 0 1 0 11.32l-48 48a8 8 0 0 1-11.32 0l-48-48a8 8 0 0 1 11.32-11.32L128 212.69l42.34-42.35a8 8 0 0 1 11.32 0Zm-96-84.68L128 43.31l42.34 42.35a8 8 0 0 0 11.32-11.32l-48-48a8 8 0 0 0-11.32 0l-48 48a8 8 0 0 0 11.32 11.32Z" />
    </svg>
  );
}
function IconAudioLines({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M2 10v3" />
      <path d="M6 6v11" />
      <path d="M10 3v18" />
      <path d="M14 8v7" />
      <path d="M18 5v13" />
      <path d="M22 10v3" />
    </svg>
  );
}
function IconPencilLine({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      <path d="m15 5 3 3" />
    </svg>
  );
}
function IconFileType({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M9 13v-1h6v1" />
      <path d="M12 12v6" />
      <path d="M11 18h2" />
    </svg>
  );
}
function IconBrainCircuit({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z" />
      <path d="M16 8V5c0-1.1.9-2 2-2" />
      <path d="M12 13h4" />
      <path d="M12 18h6a2 2 0 0 1 2 2v1" />
      <path d="M12 8h8" />
      <path d="M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
      <path d="M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
      <path d="M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
      <path d="M18.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
    </svg>
  );
}

function IconGraduationCap({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}
function IconBrainCog({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5" />
      <path d="m15.7 10.4-.9.4" />
      <path d="m9.2 13.2-.9.4" />
      <path d="m13.6 15.7-.4-.9" />
      <path d="m10.8 9.2-.4-.9" />
      <path d="m15.7 13.5-.9-.4" />
      <path d="m9.2 10.9-.9-.4" />
      <path d="m10.5 15.7.4-.9" />
      <path d="m13.1 9.2.4-.9" />
    </svg>
  );
}
function IconLightbulb({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}
function IconWallet({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  );
}
function IconHandshake({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </svg>
  );
}
function IconMic2({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
      <circle cx="17" cy="7" r="5" />
    </svg>
  );
}
function IconLibraryBig({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <rect width="8" height="18" x="3" y="3" rx="1" />
      <path d="M7 3v18" />
      <path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z" />
    </svg>
  );
}
function IconHistory({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}
function IconBot({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}
function IconFileStack({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M21 7h-3a2 2 0 0 1-2-2V2" />
      <path d="M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17Z" />
      <path d="M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15" />
      <path d="M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11" />
    </svg>
  );
}
function IconFileHeart({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.29 10.7a2.43 2.43 0 0 0-2.66-.52c-.29.12-.56.3-.78.53l-.35.34-.35-.34a2.43 2.43 0 0 0-2.65-.53c-.3.12-.56.3-.79.53-.95.94-1 2.53.2 3.74L6.5 18l3.6-3.55c1.2-1.21 1.14-2.8.19-3.74Z" />
    </svg>
  );
}
function IconXCircle({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}
function IconArrowBigDownDash({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M15 5H9" />
      <path d="M15 9v3h4l-7 7-7-7h4V9z" />
    </svg>
  );
}
function IconArrowBigUp({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M9 18v-6H5l7-7 7 7h-4v6H9z" />
    </svg>
  );
}
function EditIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="m18 5-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
      <path d="M8 18h1" />
      <path d="M18.4 9.6a2 2 0 1 1 3 3L17 17l-4 1 1-4Z" />
    </svg>
  );
}
function IconScanText({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M7 8h8" />
      <path d="M7 12h10" />
      <path d="M7 16h6" />
    </svg>
  );
}
function IconBotMessageSquare({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M12 6V2H8" />
      <path d="M8 18l-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
      <path d="M2 12h2" />
      <path d="M9 11v2" />
      <path d="M15 11v2" />
      <path d="M20 12h2" />
    </svg>
  );
}
function IconBookPlus({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      <path d="M9 10h6" />
      <path d="M12 7v6" />
    </svg>
  );
}
function IconAudioWaveform({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2" />
    </svg>
  );
}
function IconSave({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}
function FacebookIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function LinkedInIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function IconSearch({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
function IconUserRound({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}

function IconMonitorPlay({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z" />
      <path d="M12 17v4" />
      <path d="M8 21h8" />
      <rect x="2" y="3" width="20" height="14" rx="2" />
    </svg>
  );
}

function IconGlasses({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="6" cy="15" r="4" />
      <circle cx="18" cy="15" r="4" />
      <path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
      <path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2" />
      <path d="M21.5 13 19 7c-.7-1.3-1.5-2-3-2" />
    </svg>
  );
}

export default IconUserRound;
function TwitterIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function IconChevronRight({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function IconChevronLeft({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
function IconHeart({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
function IconHeartFill({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function IconUpgrades({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M9 19h6" />
      <path d="M9 15v-3H5l7-7 7 7h-4v3H9z" />
    </svg>
  );
}

function IconCaretDown({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}
function IconSquareArrowUpRight({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
      <path d="m21 3-9 9" />
      <path d="M15 3h6v6" />
    </svg>
  );
}

function IconEye({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconEar({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0" />
      <path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4" />
    </svg>
  );
}
function IconFlag({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function IconGlobe({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}
function IconClone({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-users h-6 w-6", className)}
      {...props}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconInfo({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-info h-6 w-6", className)}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
function IconPlusSquareDiff({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-message-square-diff h-6 w-6", className)}
      {...props}
    >
      <path d="m5 19-2 2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" />
      <path d="M9 10h6" />
      <path d="M12 7v6" />
      <path d="M9 17h6" />
    </svg>
  );
}
function IconCopyright({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M14.83 14.83a4 4 0 1 1 0-5.66" />
    </svg>
  );
}

function IconNoImage({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <line x1="2" x2="22" y1="2" y2="22" />
      <path d="M10.41 10.41a2 2 0 1 1-2.83-2.83" />
      <line x1="13.5" x2="6" y1="13.5" y2="21" />
      <line x1="18" x2="21" y1="12" y2="15" />
      <path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59" />
      <path d="M21 15V5a2 2 0 0 0-2-2H9" />
    </svg>
  );
}

function IconTestTubeDiagonal({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3" />
      <path d="m16 2 6 6" />
      <path d="M12 16H4" />
    </svg>
  );
}

function IconTestTube({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2" />
      <path d="M8.5 2h7" />
      <path d="M14.5 16h-5" />
    </svg>
  );
}

function IconImage({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function IconFlask({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
      <path d="M8.5 2h7" />
      <path d="M7 16h10" />
    </svg>
  );
}

function IconNoAi({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M13.67 8H18a2 2 0 0 1 2 2v4.33" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M22 22 2 2" />
      <path d="M8 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 1.414-.586" />
      <path d="M9 13v2" />
      <path d="M9.67 4H12v2.33" />
    </svg>
  );
}
function StarIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function MapPinIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function FileImageIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-file-image", className)}
      {...props}
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <circle cx="10" cy="12" r="2" />
      <path d="m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22" />
    </svg>
  );
}

function ImageDownloadIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-image-down", className)}
      {...props}
    >
      <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
      <path d="m14 19 3 3v-5.5" />
      <path d="m17 22 3-3" />
      <circle cx="9" cy="9" r="2" />
    </svg>
  );
}
function SirenIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-siren", className)}
      {...props}
    >
      <path d="M7 18v-6a5 5 0 1 1 10 0v6" />
      <path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z" />
      <path d="M21 12h1" />
      <path d="M18.5 4.5 18 5" />
      <path d="M2 12h1" />
      <path d="M12 2v1" />
      <path d="m4.929 4.929.707.707" />
      <path d="M12 12v6" />
    </svg>
  );
}

function IconClipboard({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-siren", className)}
      {...props}
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      <path d="M16 4h2a2 2 0 0 1 2 2v4" />
      <path d="M21 14H11" />
      <path d="m15 10-4 4 4 4" />
    </svg>
  );
}

function IconCrowm({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-siren", className)}
      {...props}
    >
      <path
        d="M35.799 38.6207C39.0951 35.3585 42.3622 32.8442 45.4701 30.1681C45.5991 30.0583 45.7475 30.0153 45.8935 30.0454C46.0395 30.0755 46.1754 30.1773 46.2811 30.3356C46.3869 30.4939 46.4569 30.7004 46.4809 30.9248C46.5049 31.1491 46.4816 31.3795 46.4145 31.5819C44.7011 36.6451 41.8061 44.8273 39.6099 50.6158C39.5472 50.7822 39.4487 50.9093 39.3315 50.9751C39.2143 51.041 39.0859 51.0413 38.9685 50.9761C38.953 51.1156 38.9163 51.2473 38.8614 51.3606C38.8064 51.4738 38.7348 51.5653 38.6525 51.6275C38.5701 51.6896 38.4794 51.7207 38.3878 51.7181C38.2961 51.7155 38.2062 51.6793 38.1254 51.6125C32.7004 47.4034 26.7511 45.0507 20.6835 44.715C20.5036 44.697 20.3348 44.5752 20.2105 44.3737C20.0863 44.1722 20.0157 43.9058 20.0129 43.6277C19.9192 37.421 19.3468 31.1309 18.9504 25.2909C18.9384 25.022 18.9838 24.7543 19.0796 24.5289C19.1755 24.3036 19.3165 24.1328 19.4811 24.0427C19.6457 23.9527 19.8248 23.9483 19.9912 24.0302C20.1576 24.1121 20.302 24.2759 20.4025 24.4964L25.4017 35.9455C26.5995 33.6218 31.9774 23.5116 33.4713 20.8142C33.5779 20.6251 33.7176 20.4877 33.8737 20.4187C34.0297 20.3497 34.1954 20.352 34.3506 20.4253C34.5058 20.4986 34.644 20.6399 34.7483 20.8319C34.8526 21.0239 34.9187 21.2585 34.9384 21.5072C35.3784 27.4498 35.5719 32.6224 35.799 38.6207ZM44.1668 33.7513C41.2949 36.2567 38.2097 38.9217 35.5416 41.8319C35.4256 41.9544 35.2906 42.0274 35.1504 42.0437C35.0102 42.06 34.8697 42.019 34.7431 41.9247C34.6164 41.8305 34.5081 41.6864 34.4291 41.5069C34.35 41.3274 34.303 41.1189 34.2928 40.9024C34.1298 37.0572 33.5892 26.3426 33.4891 24.8032C32.4319 26.7372 27.4339 36.1437 26.0066 38.9058C25.9255 39.0632 25.8216 39.189 25.7032 39.2728C25.5848 39.3565 25.4553 39.396 25.3251 39.3879C25.195 39.3798 25.0679 39.3244 24.9542 39.2262C24.8405 39.128 24.7435 38.9898 24.671 38.8228L20.8621 30.0421C21.1368 34.1832 21.3954 38.4194 21.4481 42.5893C27.4511 43.189 33.3069 45.7162 38.6411 50.0093C38.6719 49.778 41.5112 41.8434 44.1668 33.7513Z"
        fill="#FF9900"
      />
      <path
        d="M0.483647 30.3521C3.2585 32.7285 6.19629 34.6198 9.24261 35.9912C9.38496 36.0799 9.5443 36.0776 9.68558 35.985C9.82685 35.8923 9.9385 35.7167 9.99595 35.497C10.0534 35.2772 10.0519 35.0312 9.99191 34.8131C9.93187 34.595 9.81818 34.4226 9.67583 34.3339C6.91066 31.8857 3.94175 30.0324 0.851505 28.8253C0.726273 28.7838 0.595545 28.8133 0.483239 28.9084C0.370933 29.0035 0.284553 29.1578 0.2399 29.3431C0.195246 29.5285 0.195298 29.7324 0.240056 29.9177C0.284815 30.103 0.371287 30.2572 0.483647 30.3521Z"
        fill="#FF9900"
      />
      <path
        d="M15.7567 3.93848C18.8035 10.8573 19.7015 11.3574 21.6976 15.3042C21.7871 15.4883 21.9192 15.612 22.0663 15.6496C22.2134 15.6873 22.3642 15.636 22.4875 15.5064C22.6107 15.3769 22.6969 15.179 22.7281 14.9539C22.7593 14.7288 22.7331 14.4938 22.655 14.2977C21.0502 9.99808 18.9928 6.14111 16.5672 2.88506C16.4721 2.746 16.3472 2.66586 16.2162 2.65995C16.0853 2.65404 15.9575 2.72277 15.8573 2.85302C15.7571 2.98327 15.6914 3.16592 15.6729 3.36613C15.6543 3.56633 15.6842 3.77007 15.7567 3.93848Z"
        fill="#FF9900"
      />
      <path
        d="M41.0508 0.717982C39.3754 4.67275 38.1969 9.07871 37.5765 13.7061C37.5269 13.9304 37.537 14.176 37.6046 14.3888C37.6723 14.6016 37.7919 14.7642 37.9372 14.8408C38.0825 14.9174 38.2416 14.9018 38.3794 14.7973C38.5173 14.6929 38.6226 14.5082 38.6722 14.2838C39.2716 12.087 39.9616 10.0173 40.8297 6.66972C41.4403 4.2932 41.6373 3.07481 42.0106 1.41453C42.0541 1.22233 42.0499 1.01206 41.9988 0.824377C41.9477 0.63669 41.8534 0.484893 41.7341 0.398291C41.6147 0.31169 41.4788 0.296432 41.3527 0.355476C41.2265 0.41452 41.1189 0.543673 41.0508 0.717982Z"
        fill="#FF9900"
      />
      <path
        d="M52.2131 30.5155C53.2874 30.1484 54.5637 29.8312 55.9096 29.2637C58.0812 28.3821 59.7573 27.4368 61.3252 26.7087C61.3991 26.6828 61.4691 26.6347 61.531 26.5671C61.5929 26.4994 61.6456 26.4136 61.6861 26.3146C61.7265 26.2155 61.7539 26.1051 61.7667 25.9897C61.7795 25.8743 61.7775 25.7561 61.7607 25.6419C61.744 25.5277 61.7128 25.4197 61.669 25.3241C61.6252 25.2285 61.5696 25.1472 61.5054 25.0848C61.4413 25.0223 61.3698 24.98 61.295 24.9602C61.2202 24.9404 61.1437 24.9436 61.0697 24.9695C57.882 25.4734 54.7746 26.8237 51.8846 28.9608C51.7657 29.0451 51.6711 29.1939 51.6186 29.3789C51.5662 29.5638 51.5596 29.7721 51.6002 29.9641C51.6408 30.1561 51.7256 30.3183 51.8386 30.42C51.9516 30.5217 52.0849 30.5556 52.2131 30.5155Z"
        fill="#FF9900"
      />
      <path
        d="M48.8868 43.1201C55.2977 44.7447 57.0885 44.5136 59.7048 45.4426C59.8502 45.4995 60.0042 45.4672 60.1344 45.3525C60.2647 45.2378 60.3611 45.0497 60.4034 44.8276C60.4458 44.6054 60.4307 44.3667 60.3614 44.1614C60.2921 43.956 60.174 43.8001 60.0319 43.7264C58.2544 42.7383 56.4088 42.0718 54.5319 41.7402C52.6863 41.4381 50.8285 41.3534 48.9746 41.4866C48.8418 41.4887 48.7142 41.5672 48.6169 41.7068C48.5196 41.8465 48.4596 42.0372 48.4486 42.2416C48.4376 42.446 48.4764 42.6494 48.5575 42.8119C48.6386 42.9744 48.756 43.0843 48.8868 43.1201Z"
        fill="#FF9900"
      />
    </svg>
  );
}

function IconPocketKnife({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-siren", className)}
      {...props}
    >
      <path d="M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2" />
      <path d="M18 6h.01" />
      <path d="M6 18h.01" />
      <path d="M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z" />
      <path d="M18 11.66V22a4 4 0 0 0 4-4V6" />
    </svg>
  );
}

function IconFooterPhone({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("lucide lucide-siren", className)}
      {...props}
    >
      <path
        d="M17.6669 14.0994V16.5994C17.6679 16.8315 17.6203 17.0612 17.5274 17.2739C17.4344 17.4865 17.298 17.6774 17.127 17.8343C16.956 17.9912 16.7541 18.1107 16.5342 18.185C16.3144 18.2594 16.0814 18.287 15.8503 18.2661C13.286 17.9875 10.8228 17.1112 8.6586 15.7078C6.64513 14.4283 4.93805 12.7212 3.6586 10.7078C2.25025 8.53377 1.37381 6.05859 1.10027 3.48276C1.07945 3.25232 1.10683 3.02006 1.18069 2.80078C1.25454 2.5815 1.37325 2.38 1.52924 2.20911C1.68524 2.03822 1.87511 1.90169 2.08676 1.8082C2.29842 1.71471 2.52722 1.66631 2.7586 1.6661H5.2586C5.66303 1.66212 6.0551 1.80533 6.36174 2.06904C6.66838 2.33275 6.86867 2.69897 6.92527 3.09943C7.03079 3.89949 7.22648 4.68504 7.5086 5.4411C7.62072 5.73937 7.64499 6.06353 7.57853 6.37516C7.51206 6.6868 7.35766 6.97286 7.1336 7.19943L6.07527 8.25776C7.26157 10.3441 8.98898 12.0715 11.0753 13.2578L12.1336 12.1994C12.3602 11.9754 12.6462 11.821 12.9579 11.7545C13.2695 11.688 13.5937 11.7123 13.8919 11.8244C14.648 12.1066 15.4335 12.3022 16.2336 12.4078C16.6384 12.4649 17.0081 12.6688 17.2724 12.9807C17.5367 13.2926 17.6771 13.6907 17.6669 14.0994Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFooterMail({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("lucide lucide-siren", className)}
      {...props}
    >
      <path
        d="M17.0002 3.33398H3.66691C2.74644 3.33398 2.00024 4.08018 2.00024 5.00065V15.0007C2.00024 15.9211 2.74644 16.6673 3.66691 16.6673H17.0002C17.9207 16.6673 18.6669 15.9211 18.6669 15.0007V5.00065C18.6669 4.08018 17.9207 3.33398 17.0002 3.33398Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.6669 5.83398L11.1919 10.584C10.9346 10.7452 10.6372 10.8307 10.3336 10.8307C10.03 10.8307 9.73252 10.7452 9.47524 10.584L2.00024 5.83398"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFooterLocation({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("lucide lucide-siren", className)}
      {...props}
    >
      <path
        d="M17.0001 8.33268C17.0001 12.4935 12.3842 16.8269 10.8342 18.1652C10.6899 18.2738 10.5141 18.3325 10.3334 18.3325C10.1527 18.3325 9.97698 18.2738 9.83258 18.1652C8.28258 16.8269 3.66675 12.4935 3.66675 8.33268C3.66675 6.56457 4.36913 4.86888 5.61937 3.61864C6.86961 2.36839 8.5653 1.66602 10.3334 1.66602C12.1015 1.66602 13.7972 2.36839 15.0475 3.61864C16.2977 4.86888 17.0001 6.56457 17.0001 8.33268Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.3335 10.834C11.7142 10.834 12.8335 9.7147 12.8335 8.33398C12.8335 6.95327 11.7142 5.83398 10.3335 5.83398C8.95278 5.83398 7.8335 6.95327 7.8335 8.33398C7.8335 9.7147 8.95278 10.834 10.3335 10.834Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCircleStop({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-arrow-left", className)}
      {...props}
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
function TalkIcon({
  color = "#0066FF",
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-4 w-4 ${className}`}
      {...props}
    >
      <path
        d="M8.8 20.0008V15.9008L10.7 16.1008C11.2531 16.0701 11.7766 15.8407 12.1742 15.4549C12.5717 15.0691 12.8167 14.5528 12.864 14.0008V8.30081C12.8706 6.86015 12.3047 5.47587 11.2907 4.45248C10.2767 3.4291 8.89766 2.85044 7.457 2.84381C6.01634 2.83718 4.63206 3.40312 3.60867 4.41713C2.58529 5.43114 2.00663 6.81015 2 8.25081C2 11.0508 2.656 11.3048 3 12.8008C3.23248 13.7043 3.24243 14.6506 3.029 15.5588L2 20.0008"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.7998 17.8003C21.2056 16.3943 21.9956 14.4876 21.9962 12.4994C21.9968 10.5111 21.2078 8.60404 19.8028 7.19727"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.0001 15.0004C17.3273 14.6733 17.5863 14.2846 17.7623 13.8567C17.9383 13.4288 18.0278 12.9703 18.0254 12.5077C18.0231 12.045 17.9291 11.5874 17.7488 11.1614C17.5685 10.7353 17.3055 10.3492 16.9751 10.0254"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function BurgerIcon({
  color = "currentColor",
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${className}`}
      {...props}
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
function XIcon({
  color = "currentColor",
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${className}`}
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
function IconChevronDown({
  color = "currentColor",
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${className}`}
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
function IconClapperboard({
  color = "currentColor",
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${className}`}
      {...props}
    >
      <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
      <path d="m6.2 5.3 3.1 3.9" />
      <path d="m12.4 3.4 3.1 4" />
      <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </svg>
  );
}

function LightMessageBubbleArrow({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      width="35"
      height="29"
      viewBox="0 0 35 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      {...props}
    >
      <path
        d="M1.29665 1.87417L1.2967 1.8741L1.30415 1.88012L32.3811 27.021C33.119 27.5938 33.6131 27.6279 33.8572 27.5217C34.0821 27.424 34.3642 27.0809 34.3642 26.1905L34.3642 3.49112C34.3642 2.69754 34.0489 1.93646 33.4878 1.37531C32.9266 0.814157 32.1655 0.498906 31.372 0.498906L1.68812 0.498909C1.24653 0.498909 0.937253 0.560093 0.741923 0.642437C0.548859 0.723827 0.513387 0.803043 0.506109 0.82609C0.49768 0.852781 0.481785 0.948864 0.597147 1.14577C0.712268 1.34227 0.93318 1.59147 1.29665 1.87417Z"
        fill="#E2E8F0"
        stroke="#E2E8F0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DarkMessageBubbleArrow({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      width="35"
      height="29"
      viewBox="0 0 35 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      {...props}
    >
      <path
        d="M33.5666 1.87417L33.5666 1.8741L33.5591 1.88012L2.48223 27.021C1.74425 27.5938 1.25015 27.6279 1.00605 27.5217C0.781204 27.424 0.499111 27.0809 0.499111 26.1905L0.499113 3.49112C0.499113 2.69754 0.814364 1.93646 1.37551 1.37531C1.93666 0.814157 2.69774 0.498906 3.49133 0.498906L33.1752 0.498909C33.6168 0.498909 33.926 0.560093 34.1214 0.642437C34.3144 0.723827 34.3499 0.803043 34.3572 0.82609C34.3656 0.852781 34.3815 0.948864 34.2661 1.14577C34.151 1.34227 33.9301 1.59147 33.5666 1.87417Z"
        fill="#636D80"
        stroke="#636D80"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconVideoCamera({
  color = "currentColor",
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${className}`}
      {...props}
    >
      <path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97" />
      <path d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z" />
      <path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15" />
      <path d="M2 21v-4" />
      <path d="M7 9h.01" />
    </svg>
  );
}
function IconPause({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <rect x="14" y="4" width="4" height="16" rx="1" />
      <rect x="6" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}
export function IconHeadphones({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}
function IconMusic({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}
function IconMic({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}
function IconAlerts({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="53"
      height="52"
      viewBox="0 0 53 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-15 w-15", className)}
      {...props}
    >
      <path
        d="M22.75 45.5C23.1303 46.1587 23.6774 46.7057 24.3361 47.086C24.9948 47.4663 25.742 47.6665 26.5027 47.6665C27.2633 47.6665 28.0105 47.4663 28.6692 47.086C29.328 46.7057 29.875 46.1587 30.2553 45.5"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.56608 33.206C7.28304 33.5162 7.09625 33.902 7.02844 34.3165C6.96062 34.7309 7.01471 35.1561 7.18411 35.5404C7.35352 35.9246 7.63094 36.2514 7.98264 36.4809C8.33433 36.7104 8.74514 36.8327 9.16508 36.833H43.8318C44.2516 36.8332 44.6625 36.7113 45.0145 36.4822C45.3664 36.2532 45.6442 35.9268 45.814 35.5428C45.9839 35.1588 46.0385 34.7337 45.9712 34.3192C45.9039 33.9047 45.7177 33.5187 45.4351 33.2082C42.5534 30.2377 39.4984 27.0808 39.4984 17.333C39.4984 13.8852 38.1288 10.5786 35.6908 8.14062C33.2528 5.70265 29.9462 4.33301 26.4984 4.33301C23.0506 4.33301 19.744 5.70265 17.306 8.14062C14.8681 10.5786 13.4984 13.8852 13.4984 17.333C13.4984 27.0808 10.4413 30.2377 7.56608 33.206Z"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconAmbient({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="53"
      height="52"
      viewBox="0 0 53 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-15 w-15", className)}
      {...props}
    >
      <path
        d="M24.5798 43.333C20.7753 43.3445 17.1054 41.9258 14.2979 39.3581C11.4905 36.7904 9.75066 33.2614 9.42342 29.4709C9.09619 25.6805 10.2055 21.9055 12.5313 18.8946C14.8571 15.8838 18.2296 13.857 21.9798 13.2163C34.3298 10.833 37.5798 9.70634 41.9132 4.33301C44.0798 8.66634 46.2465 13.3897 46.2465 21.6663C46.2465 33.583 35.8898 43.333 24.5798 43.333Z"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.08594 45.5C5.08594 39 9.09427 33.8867 16.0926 32.5C21.3359 31.46 26.7526 28.1667 28.9193 26"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconBassDrops({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-15 w-15", className)}
      {...props}
    >
      <path
        d="M38.9974 4.33301H12.9974C10.6042 4.33301 8.66406 6.27311 8.66406 8.66634V43.333C8.66406 45.7262 10.6042 47.6663 12.9974 47.6663H38.9974C41.3906 47.6663 43.3307 45.7262 43.3307 43.333V8.66634C43.3307 6.27311 41.3906 4.33301 38.9974 4.33301Z"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 13H26.0217"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.0026 39.0003C30.7891 39.0003 34.6693 35.1201 34.6693 30.3337C34.6693 25.5472 30.7891 21.667 26.0026 21.667C21.2161 21.667 17.3359 25.5472 17.3359 30.3337C17.3359 35.1201 21.2161 39.0003 26.0026 39.0003Z"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 30.333H26.0217"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconClocks({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="53"
      height="52"
      viewBox="0 0 53 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-15 w-15", className)}
      {...props}
    >
      <path
        d="M26.2526 47.6663C38.2188 47.6663 47.9193 37.9658 47.9193 25.9997C47.9193 14.0335 38.2188 4.33301 26.2526 4.33301C14.2864 4.33301 4.58594 14.0335 4.58594 25.9997C4.58594 37.9658 14.2864 47.6663 26.2526 47.6663Z"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.2526 13V26L17.5859 21.6667"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconKeyboards({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="53"
      height="52"
      viewBox="0 0 53 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-15 w-15", className)}
      {...props}
    >
      <path
        d="M22.1641 17.333H22.1857"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.5 26H26.5217"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.8359 17.333H30.8576"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35.1641 26H35.1857"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39.5 17.333H39.5217"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 17.333H13.5217"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6641 34.667H37.3307"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.8359 26H17.8576"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43.8359 8.66699H9.16927C6.77604 8.66699 4.83594 10.6071 4.83594 13.0003V39.0003C4.83594 41.3936 6.77604 43.3337 9.16927 43.3337H43.8359C46.2292 43.3337 48.1693 41.3936 48.1693 39.0003V13.0003C48.1693 10.6071 46.2292 8.66699 43.8359 8.66699Z"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconPeople({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="53"
      height="52"
      viewBox="0 0 53 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-15 w-15", className)}
      {...props}
    >
      <path
        d="M26.5026 13.0003C27.6992 13.0003 28.6693 12.0303 28.6693 10.8337C28.6693 9.63704 27.6992 8.66699 26.5026 8.66699C25.306 8.66699 24.3359 9.63704 24.3359 10.8337C24.3359 12.0303 25.306 13.0003 26.5026 13.0003Z"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 43.333L26.5 30.333L33 43.333"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 17.333L26.5 21.6663L39.5 17.333"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.5 21.667V30.3337"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconSuspense({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="53"
      height="52"
      viewBox="0 0 53 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-15 w-15", className)}
      {...props}
    >
      <path
        d="M9.41806 34.6663V29.5097C9.41806 24.9163 7.18639 22.7497 7.25139 17.333C7.31639 11.4397 10.4797 4.33301 17.0014 4.33301C21.0531 4.33301 22.4181 8.23301 22.4181 11.9163C22.4181 18.6547 18.0847 24.1797 18.0847 30.723V34.6663C18.0847 35.8156 17.6282 36.9178 16.8155 37.7305C16.0029 38.5431 14.9007 38.9997 13.7514 38.9997C12.6021 38.9997 11.4999 38.5431 10.6873 37.7305C9.87461 36.9178 9.41806 35.8156 9.41806 34.6663Z"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M44.0859 43.3333V38.1767C44.0859 33.5833 46.3176 31.4167 46.2526 26C46.1876 20.1067 43.0243 13 36.5026 13C32.4509 13 31.0859 16.9 31.0859 20.5833C31.0859 27.3217 35.4193 32.8467 35.4193 39.39V43.3333C35.4193 44.4826 35.8758 45.5848 36.6885 46.3975C37.5011 47.2101 38.6033 47.6667 39.7526 47.6667C40.9019 47.6667 42.0041 47.2101 42.8167 46.3975C43.6294 45.5848 44.0859 44.4826 44.0859 43.3333Z"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35.4141 36.833H44.0807"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.41406 28.167H18.0807"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconTechnology({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-15 w-15", className)}
      {...props}
    >
      <path
        d="M38.9974 8.66699H12.9974C10.6042 8.66699 8.66406 10.6071 8.66406 13.0003V39.0003C8.66406 41.3936 10.6042 43.3337 12.9974 43.3337H38.9974C41.3906 43.3337 43.3307 41.3936 43.3307 39.0003V13.0003C43.3307 10.6071 41.3906 8.66699 38.9974 8.66699Z"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.3333 19.5H21.6667C20.47 19.5 19.5 20.47 19.5 21.6667V30.3333C19.5 31.53 20.47 32.5 21.6667 32.5H30.3333C31.53 32.5 32.5 31.53 32.5 30.3333V21.6667C32.5 20.47 31.53 19.5 30.3333 19.5Z"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32.5 4.33301V8.66634"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32.5 43.333V47.6663"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.33594 32.5H8.66927"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.33594 19.5H8.66927"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43.3359 32.5H47.6693"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43.3359 19.5H47.6693"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 4.33301V8.66634"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 43.333V47.6663"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconVideogames({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="53"
      height="52"
      viewBox="0 0 53 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-15 w-15", className)}
      {...props}
    >
      <path
        d="M45.75 36.8333C45.75 35.6841 45.2935 34.5819 44.4808 33.7692C43.6681 32.9565 42.5659 32.5 41.4167 32.5H11.0833C9.93406 32.5 8.83186 32.9565 8.0192 33.7692C7.20655 34.5819 6.75 35.6841 6.75 36.8333V41.1667C6.75 42.3159 7.20655 43.4181 8.0192 44.2308C8.83186 45.0435 9.93406 45.5 11.0833 45.5H41.4167C42.5659 45.5 43.6681 45.0435 44.4808 44.2308C45.2935 43.4181 45.75 42.3159 45.75 41.1667V36.8333Z"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.25 32.5003V28.167"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.25 32.5V19.5"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.25 19.5C29.8399 19.5 32.75 16.5899 32.75 13C32.75 9.41015 29.8399 6.5 26.25 6.5C22.6601 6.5 19.75 9.41015 19.75 13C19.75 16.5899 22.6601 19.5 26.25 19.5Z"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconWooshes({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="53"
      height="52"
      viewBox="0 0 53 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-15 w-15", className)}
      {...props}
    >
      <path
        d="M28.2359 42.467C28.7852 42.879 29.4246 43.1545 30.1013 43.2709C30.7779 43.3873 31.4726 43.3413 32.128 43.1366C32.7834 42.9318 33.3808 42.5743 33.8709 42.0934C34.361 41.6125 34.7298 41.022 34.9469 40.3706C35.164 39.7193 35.2233 39.0256 35.1197 38.3468C35.0162 37.6681 34.7528 37.0236 34.3513 36.4666C33.9498 35.9096 33.4218 35.4559 32.8106 35.143C32.1994 34.8302 31.5226 34.667 30.8359 34.667H4.83594"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38.4193 17.3337C38.9733 16.595 39.7069 16.0102 40.5504 15.6349C41.394 15.2595 42.3195 15.106 43.239 15.1889C44.1586 15.2718 45.0417 15.5884 45.8045 16.1086C46.5673 16.6288 47.1845 17.3354 47.5974 18.1613C48.0103 18.9871 48.2053 19.9048 48.1638 20.8271C48.1223 21.7495 47.8457 22.646 47.3603 23.4314C46.8749 24.2168 46.1968 24.8651 45.3903 25.3147C44.5839 25.7643 43.6759 26.0003 42.7526 26.0003H4.83594"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.7359 9.53366C22.2852 9.12168 22.9246 8.84614 23.6013 8.72973C24.2779 8.61331 24.9726 8.65937 25.628 8.8641C26.2834 9.06883 26.8808 9.42637 27.3709 9.90726C27.861 10.3881 28.2298 10.9786 28.4469 11.63C28.664 12.2814 28.7233 12.9751 28.6197 13.6538C28.5162 14.3326 28.2528 14.9771 27.8513 15.5341C27.4498 16.0911 26.9217 16.5447 26.3106 16.8576C25.6994 17.1705 25.0226 17.3337 24.3359 17.3337H4.83594"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconCinematic({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="53"
      height="52"
      viewBox="0 0 53 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-15 w-15", className)}
      {...props}
    >
      <path
        d="M41.6667 6.5H11.3333C8.9401 6.5 7 8.4401 7 10.8333V41.1667C7 43.5599 8.9401 45.5 11.3333 45.5H41.6667C44.0599 45.5 46 43.5599 46 41.1667V10.8333C46 8.4401 44.0599 6.5 41.6667 6.5Z"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6641 6.5V45.5"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 16.25H15.6667"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 26H46"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 35.75H15.6667"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.3359 6.5V45.5"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.3359 16.25H46.0026"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.3359 35.75H46.0026"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconHipHop({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="53"
      height="52"
      viewBox="0 0 53 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-15 w-15", className)}
      {...props}
    >
      <path
        d="M9.16406 19.5V10.8333C9.16406 9.68406 9.62061 8.58186 10.4333 7.7692C11.2459 6.95655 12.3481 6.5 13.4974 6.5H39.4974C40.6467 6.5 41.7489 6.95655 42.5615 7.7692C43.3742 8.58186 43.8307 9.68406 43.8307 10.8333V19.5"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.8359 17.333V19.4997"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.5 17.333V19.4997"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35.1641 17.333V19.4997"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43.8359 19.5H9.16927C6.77604 19.5 4.83594 21.4401 4.83594 23.8333V41.1667C4.83594 43.5599 6.77604 45.5 9.16927 45.5H43.8359C46.2292 45.5 48.1693 43.5599 48.1693 41.1667V23.8333C48.1693 21.4401 46.2292 19.5 43.8359 19.5Z"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.8333 36.8337C20.2266 36.8337 22.1667 34.8936 22.1667 32.5003C22.1667 30.1071 20.2266 28.167 17.8333 28.167C15.4401 28.167 13.5 30.1071 13.5 32.5003C13.5 34.8936 15.4401 36.8337 17.8333 36.8337Z"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35.1693 36.8337C37.5625 36.8337 39.5026 34.8936 39.5026 32.5003C39.5026 30.1071 37.5625 28.167 35.1693 28.167C32.776 28.167 30.8359 30.1071 30.8359 32.5003C30.8359 34.8936 32.776 36.8337 35.1693 36.8337Z"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconPop({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="53"
      height="52"
      viewBox="0 0 53 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-15 w-15", className)}
      {...props}
    >
      <path
        d="M24.3351 16.4688L11.3481 34.2138C11.0425 34.6312 10.8964 35.1442 10.9361 35.66C10.9758 36.1758 11.1988 36.6604 11.5647 37.0261L13.3349 38.7984C13.7062 39.1693 14.1994 39.3928 14.723 39.4275C15.2466 39.4621 15.765 39.3056 16.1819 38.9869L33.1967 25.9999"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.2479 45.8773C34.0813 44.417 31.6373 43.3337 28.6646 43.3337C24.2056 43.3337 20.1539 48.4383 15.6646 47.667C11.1753 46.8957 9.65209 40.3675 12.4146 37.917"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35.1693 25.9997C41.1524 25.9997 46.0026 21.1494 46.0026 15.1663C46.0026 9.18326 41.1524 4.33301 35.1693 4.33301C29.1862 4.33301 24.3359 9.18326 24.3359 15.1663C24.3359 21.1494 29.1862 25.9997 35.1693 25.9997Z"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconTechnical({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="53"
      height="52"
      viewBox="0 0 53 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-15 w-15", className)}
      {...props}
    >
      <path
        d="M43.8359 8.66699H9.16927C6.77604 8.66699 4.83594 10.6071 4.83594 13.0003V39.0003C4.83594 41.3936 6.77604 43.3337 9.16927 43.3337H43.8359C46.2292 43.3337 48.1693 41.3936 48.1693 39.0003V13.0003C48.1693 10.6071 46.2292 8.66699 43.8359 8.66699Z"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 17.333H22.1667"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.8359 17.333H30.8576"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39.5 17.333H39.5217"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.83594 26H48.1693"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 26V34.6667"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.1641 26V34.6667"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.8359 26V34.6667"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39.5 26V34.6667"
        stroke="#3385FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconBotBig({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="99"
      height="149"
      viewBox="0 0 99 149"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-[148px] w-[99px]", className)}
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M87.414 105.796C89.9002 107.683 92.1124 109.848 93.9796 112.309C118.009 143.983 30.8835 165.728 4.09551 131.065C-5.27843 118.935 2.46752 108.345 16.9086 101.912C17.2712 102.919 17.6468 103.89 18.0353 104.826C16.287 105.693 14.5554 106.647 12.8497 107.691C-20.9757 128.393 40.7237 163.62 85.5936 136.156C99.7078 127.516 97.1875 116.348 86.1976 108.262C86.6092 107.486 87.0149 106.666 87.414 105.796Z"
        fill="#FFAD33"
      />
      <path
        d="M56.0006 126.337C58.8607 126.854 66.1682 124.799 66.2459 123.972C66.3569 122.785 63.0879 123.879 60.7181 115.338C55.1163 95.1594 65.5725 59.6502 72.7431 52.1132C72.9503 51.8952 73.3221 51.7356 73.2241 51.3795C72.8467 50.0076 40.9749 49.2914 28.1157 52.841C16.507 56.0442 12.1928 67.444 13.8023 79.3167C19.0859 118.323 33.2974 125.187 56.0024 126.335L56.0006 126.337Z"
        fill="#FFAD33"
      />
      <path
        d="M80.2216 31.1975C69.9929 22.7264 72.4534 11.0541 78.2384 7.56676C80.4343 6.24346 75.998 3.48788 73.7651 2.63552C63.2959 -1.36553 22.1595 -3.04106 16.9037 14.4013C8.42326 42.5487 23.312 45.7188 44.7626 45.7324C68.2225 45.748 74.629 45.1447 79.97 42.6732C83.3222 41.1223 87.7677 37.8918 88.7279 34.4513C89.6621 31.106 86.8131 33.6281 83.7144 32.2873C80.7322 30.9971 81.6757 36.5024 67.982 39.0536C67.5509 39.1334 66.9959 38.9427 66.7684 39.4779C65.873 41.5815 63.8713 41.9318 62.1452 42.4047C57.2927 43.7319 51.7834 40.4081 55.1633 37.2419C57.7922 34.7782 62.58 34.8482 65.046 35.8582C66.6093 36.4985 65.91 37.8062 68.7738 36.839C73.5856 35.2141 76.529 34.3793 80.2234 31.1994L80.2216 31.1975ZM21.8617 27.4825C21.623 16.1352 25.0103 13.6521 30.2031 12.3988C39.9267 10.0558 53.1376 11.3188 59.1741 13.5937C67.969 16.9097 67.1347 24.147 67.3326 29.8625C67.3844 31.3473 52.7509 32.3632 23.4323 32.9645C21.4121 33.0054 21.9375 31.178 21.8598 27.4806L21.8617 27.4825Z"
        fill="#FFAD33"
      />
      <path
        d="M61.198 100.791C61.3034 105.749 62.2765 116.336 65.4382 119.636C68.0578 122.37 70.3647 122.694 73.2063 120.31C80.3621 114.306 86.5078 108.958 91.031 87.5774C96.9566 59.5721 90.2892 55.4309 79.0301 52.2744C68.5128 49.3262 60.5653 94.622 61.1961 100.793L61.198 100.791ZM69.7079 96.6011C68.7182 77.2381 77.4743 62.8414 79.0764 68.3253C79.883 71.0848 77.9127 72.1687 76.3846 80.85C72.6346 102.151 73.3173 110.377 72.2665 110.437C71.6634 110.472 69.2473 104.395 69.7079 96.6011Z"
        fill="#FFAD33"
      />
      <path
        d="M75.9912 17.792C75.4084 30.9219 92.4395 34.631 94.1138 21.6101C95.6012 10.0488 81.7077 2.92443 76.9236 13.4465C76.2483 14.9333 75.8894 16.4026 75.9912 17.792ZM86.5824 25.5956C88.8098 18.3603 82.4754 14.548 83.4744 12.4443C84.0183 11.3001 85.9275 11.6173 86.8266 12.4229C90.3509 15.5794 91.5201 21.0614 89.5591 24.4105C88.9264 25.4905 85.6519 28.6159 86.5824 25.5956Z"
        fill="#636D80"
      />
      <path
        d="M31.0028 25.1101C32.8472 24.2694 32.8158 20.821 31.2766 20.1302C28.5182 18.8964 28.4812 26.2582 31.0028 25.1101Z"
        fill="#636D80"
      />
      <path
        d="M272.389 175.56C271.712 177.832 271.172 180.142 270.77 182.478C270.681 180.233 270.412 177.985 270.141 175.74C270.141 175.56 269.778 175.56 269.782 175.829C269.957 190.43 269.985 190.883 269.333 192.274C267.904 195.322 262.286 194.731 259.628 195.328C259.53 195.357 259.445 195.416 259.384 195.497C259.324 195.578 259.291 195.677 259.291 195.778C259.291 195.879 259.324 195.978 259.384 196.059C259.445 196.14 259.53 196.199 259.628 196.228C261.616 196.434 263.625 196.282 265.559 195.779C269.731 195.013 270.95 192.911 270.95 188.859C272.083 193.2 275.867 194.89 279.035 193.621C279.411 193.479 279.772 193.298 280.112 193.083C281.133 195.541 281.886 198.102 282.36 200.721C281.637 201.059 280.885 201.329 280.112 201.529C277.867 202.158 275.44 202.519 273.194 203.237C272.745 203.417 272.834 204.134 273.283 204.045C276.61 203.611 279.87 202.766 282.988 201.529C283.081 201.491 283.163 201.43 283.226 201.351C283.289 201.273 283.331 201.179 283.348 201.08C283.064 198.148 282.111 195.319 280.563 192.812C280.608 192.764 280.638 192.704 280.647 192.639C280.657 192.574 280.646 192.507 280.616 192.448C280.587 192.389 280.54 192.341 280.482 192.31C280.424 192.279 280.358 192.266 280.292 192.274C279.583 192.409 278.89 192.62 278.226 192.903C277.083 193.193 275.872 193.05 274.827 192.502C273.782 191.954 272.977 191.039 272.565 189.933C270.947 186.786 272.057 182.929 272.565 179.599C272.757 178.342 272.834 176.992 273.014 175.735C276.674 175.735 280.896 174.085 281.46 172.948C281.486 172.901 281.498 172.849 281.497 172.796C281.496 172.744 281.481 172.692 281.454 172.647C281.427 172.601 281.389 172.564 281.342 172.538C281.296 172.512 281.244 172.499 281.191 172.499C280.15 172.499 280.399 173.015 276.878 174.296C275.365 174.771 273.798 175.058 272.214 175.149C271.666 175.215 271.221 175.651 272.389 175.56Z"
        fill="#191919"
      />
      <path
        d="M274.366 171.786C274.006 171.966 274.276 172.512 274.634 172.417C275.705 172.061 276.833 171.908 277.959 171.966C278.242 172.004 278.528 171.94 278.768 171.786C279.489 171.067 277.51 170.476 274.366 171.786Z"
        fill="#191919"
      />
      <path
        d="M278.768 167.114C277.831 167.141 276.912 167.372 276.074 167.791C275.236 168.21 274.5 168.808 273.917 169.541C273.899 169.559 273.885 169.58 273.875 169.603C273.866 169.626 273.861 169.65 273.861 169.675C273.861 169.726 273.881 169.774 273.917 169.81C273.952 169.846 274.001 169.866 274.051 169.866C274.101 169.866 274.15 169.846 274.185 169.81C275.431 168.781 276.976 168.182 278.589 168.104C280.498 168.104 281.201 169.391 282.094 169.901C283.044 170.534 282.831 167.566 278.768 167.114Z"
        fill="#191919"
      />
      <path
        d="M291.618 175.651C291.367 173.629 290.374 171.772 288.832 170.44C288.145 169.889 287.348 169.491 286.494 169.274C285.64 169.057 284.749 169.025 283.882 169.181C283.826 169.196 283.778 169.232 283.748 169.281C283.717 169.331 283.706 169.39 283.718 169.447C283.729 169.504 283.762 169.554 283.809 169.588C283.856 169.622 283.914 169.637 283.971 169.63C284.832 169.545 285.699 169.673 286.499 170.002C287.298 170.331 288.004 170.852 288.555 171.517C291.121 174.274 290.7 178.927 290.352 182.66C290.021 184.568 290.239 186.531 290.981 188.321C292.415 190.685 294.347 192.709 296.642 194.253C307.901 203.295 299.274 209.835 308.504 215.729C308.778 215.904 309.043 215.46 308.773 215.28C307.376 214.096 306.275 212.602 305.559 210.917C304.843 209.232 304.53 207.402 304.648 205.575C304.648 195.479 294.614 192.895 292.157 187.783C290.576 184.49 292.71 181.635 291.618 175.651Z"
        fill="#191919"
      />
      <path
        d="M242.375 202.699C237.987 203.986 234.159 206.707 231.501 210.428C231.232 210.966 231.95 211.505 232.31 211.056C234.95 208.416 237.778 203.961 246.148 202.971C247.847 202.781 249.555 202.691 251.263 202.702C251.623 202.702 251.623 202.254 251.263 202.163C248.292 201.808 245.282 201.99 242.375 202.699Z"
        fill="#191919"
      />
      <path
        d="M251.9 202.879C251.81 202.61 251.45 202.61 251.45 202.879C251.337 203.469 251.395 204.079 251.618 204.636C251.841 205.194 252.22 205.675 252.709 206.024C256.019 208.469 262.135 206.408 262.323 203.958C262.323 203.687 261.964 203.508 261.695 203.598C261.026 204.227 260.304 204.798 259.538 205.304C258.606 205.716 257.6 205.935 256.582 205.951C255.563 205.967 254.551 205.778 253.607 205.395C253.167 205.112 252.79 204.743 252.497 204.311C252.204 203.879 252.001 203.392 251.9 202.879Z"
        fill="#191919"
      />
      <path
        d="M280.206 198.295C280.566 198.117 280.475 197.578 280.116 197.398C279.422 197.326 278.721 197.387 278.05 197.578C277.323 197.687 276.603 197.837 275.893 198.026C272.234 198.942 266.848 200.171 263.492 202.339C263.433 202.364 263.387 202.411 263.362 202.469C263.338 202.528 263.337 202.594 263.361 202.653C263.384 202.712 263.43 202.76 263.488 202.785C263.546 202.811 263.612 202.812 263.672 202.79C266.441 201.925 269.066 200.914 271.849 200.183C279.84 198.087 279.345 198.874 280.206 198.295Z"
        fill="#191919"
      />
      <path
        d="M298.538 204.496C295.622 198.736 287.978 195.906 286.493 189.76C286.404 189.489 286.044 189.58 286.133 189.849C287.242 196.358 294.284 199.449 297.188 204.316C298.632 206.738 298.665 209.446 299.076 212.134C299.47 215.315 300.781 218.313 302.849 220.762C303.118 221.031 303.569 220.671 303.389 220.402C298.599 212.025 300.765 208.9 298.538 204.496Z"
        fill="#191919"
      />
      <path
        d="M305.816 205.575C307.972 207.012 310.259 208.435 311.208 210.966C312.652 214.817 311.477 216.906 311.477 219.143C311.484 219.203 311.507 219.259 311.545 219.305C311.583 219.352 311.633 219.386 311.689 219.405C311.746 219.424 311.807 219.427 311.865 219.412C311.923 219.397 311.976 219.367 312.017 219.323C312.805 217.998 313.152 216.456 313.007 214.921C313.03 213.405 312.724 211.902 312.109 210.517C310.872 208.031 308.711 206.128 306.088 205.216C305.816 205.036 305.547 205.395 305.816 205.575Z"
        fill="#191919"
      />
      <path
        d="M299.97 193.622C299.881 193.713 299.338 194.513 299.881 194.342C301.619 193.624 303.545 193.497 305.362 193.982C305.434 194.004 305.51 194.011 305.585 194.003C305.66 193.995 305.733 193.972 305.799 193.935C305.864 193.898 305.922 193.847 305.968 193.787C306.013 193.727 306.046 193.658 306.065 193.585C306.083 193.512 306.086 193.436 306.074 193.361C306.062 193.287 306.035 193.215 305.994 193.152C305.954 193.088 305.9 193.033 305.838 192.991C305.776 192.948 305.705 192.919 305.631 192.905C304.709 192.507 303.698 192.364 302.702 192.49C301.707 192.616 300.763 193.007 299.97 193.622Z"
        fill="#191919"
      />
      <path
        d="M294.943 226.692C292.466 226.971 289.967 227.001 287.485 226.783C287.216 226.783 287.216 227.141 287.395 227.231C289.911 227.913 292.536 228.097 295.122 227.771C295.968 227.743 296.797 227.528 297.55 227.141C297.729 226.962 297.729 226.603 297.459 226.603C296.623 226.452 295.765 226.483 294.943 226.692Z"
        fill="#191919"
      />
      <path
        d="M307.524 191.917C305.164 190.001 302.952 191.775 300.784 191.108C300.426 191.017 300.246 191.557 300.515 191.646C302.316 192.547 304.73 191.667 306.267 192.456C307.983 193.336 308.063 195.33 307.793 197.038C307.793 197.682 308.773 197.822 309.052 196.23C309.213 195.44 309.156 194.621 308.887 193.861C308.617 193.101 308.146 192.429 307.524 191.917Z"
        fill="#191919"
      />
      <path
        d="M309.949 197.846C309.771 198.117 310.129 198.295 310.309 198.117C311.337 197.089 312.101 195.565 311.388 194.522C311.349 194.455 311.291 194.401 311.222 194.367C311.153 194.333 311.075 194.32 310.998 194.33C310.922 194.339 310.85 194.371 310.791 194.422C310.733 194.472 310.69 194.538 310.669 194.612C310.391 195.855 310.515 197.282 309.949 197.846Z"
        fill="#191919"
      />
      <path
        d="M312.107 199.463C312.614 198.967 313 198.36 313.233 197.69C313.467 197.02 313.542 196.305 313.454 195.601C313.421 195.521 313.365 195.452 313.293 195.404C313.221 195.356 313.136 195.33 313.049 195.33C312.963 195.33 312.878 195.356 312.806 195.404C312.734 195.452 312.678 195.521 312.645 195.601C312.561 196.808 312.192 197.978 311.568 199.015C311.388 199.374 311.837 199.734 312.107 199.463Z"
        fill="#191919"
      />
      <path
        d="M254.417 85.6104C249.442 86.0839 238.111 90.5026 234.287 94.3273C232.977 95.5446 232.094 97.1521 231.771 98.911C231.771 99.18 232.038 99.2691 232.13 99.0001C233.376 96.132 235.607 93.8047 238.42 92.4397C243.438 89.6126 248.865 87.5815 254.506 86.4189C254.598 86.3904 254.677 86.3308 254.73 86.2504C254.783 86.1699 254.806 86.0735 254.795 85.9778C254.785 85.8821 254.741 85.7931 254.672 85.726C254.603 85.659 254.513 85.6181 254.417 85.6104Z"
        fill="#191919"
      />
      <path
        d="M245.16 95.3154C245.089 95.3557 245.029 95.4144 244.987 95.4854C244.946 95.5565 244.924 95.6373 244.924 95.7196C244.924 95.8019 244.946 95.8828 244.987 95.9538C245.029 96.0249 245.089 96.0836 245.16 96.1239C247.677 97.203 252.081 101.965 252.618 101.605C256.685 99.092 260.989 96.9852 265.469 95.3154C265.585 95.2815 265.688 95.2106 265.761 95.1135C265.834 95.0163 265.873 94.8981 265.873 94.7766C265.873 94.6552 265.834 94.537 265.761 94.4398C265.688 94.3427 265.585 94.2718 265.469 94.2379C264.929 94.0581 259.807 90.8224 258.639 90.103C253.991 91.4084 249.478 93.1538 245.16 95.3154Z"
        fill="#FF9900"
      />
      <path
        d="M139.125 173.314C134.384 177.92 135.897 185.237 139.125 191.017C143.355 198.596 150.196 199.016 154.305 194.702C159.314 189.45 159.74 177.377 153.945 169.901C153.67 169.544 153.226 169.99 153.406 170.349C154.332 172.03 155.143 173.771 155.833 175.562C158.083 182.492 156.95 188.719 154.664 192.276C153.772 193.842 152.343 195.032 150.642 195.627C148.94 196.221 147.081 196.18 145.408 195.51C141.813 193.806 139.768 189.841 138.49 186.255C137.075 182.295 136.691 177.269 139.567 173.765C139.664 173.494 139.394 173.135 139.125 173.314Z"
        fill="#191919"
      />
      <path
        d="M259.987 182.66C259.987 182.97 260.091 183.267 260.277 183.486C260.462 183.705 260.714 183.828 260.976 183.828C261.238 183.828 261.489 183.705 261.675 183.486C261.86 183.267 261.964 182.97 261.964 182.66C261.964 182.35 261.86 182.053 261.675 181.834C261.489 181.615 261.238 181.492 260.976 181.492C260.714 181.492 260.462 181.615 260.277 181.834C260.091 182.053 259.987 182.35 259.987 182.66Z"
        fill="#191919"
      />
      <path
        d="M266.637 181.762C266.637 182.072 266.741 182.369 266.926 182.588C267.112 182.808 267.363 182.931 267.625 182.931C267.887 182.931 268.139 182.808 268.324 182.588C268.509 182.369 268.613 182.072 268.613 181.762C268.613 181.453 268.509 181.155 268.324 180.936C268.139 180.717 267.887 180.594 267.625 180.594C267.363 180.594 267.112 180.717 266.926 180.936C266.741 181.155 266.637 181.453 266.637 181.762Z"
        fill="#191919"
      />
      <g clipPath="url(#clip0_2079_1522)">
        <path
          d="M90.8957 56.2601C90.6424 55.419 90.2913 54.6106 89.8495 53.8515C89.0059 52.4528 87.7786 51.3257 86.3132 50.6041C84.8691 49.8897 83.2621 49.5689 81.6544 49.6738C81.5768 49.6805 81.5046 49.7166 81.4526 49.7746C81.4005 49.8326 81.3725 49.9082 81.3741 49.9862C81.3809 50.0628 81.417 50.1339 81.4749 50.1846C81.5329 50.2352 81.6081 50.2616 81.6849 50.2581C83.1938 50.1915 84.6934 50.5266 86.0303 51.2293C87.3542 51.9194 88.4533 52.9736 89.1979 54.2675C89.61 54.974 89.9415 55.7244 90.1864 56.5047C90.4067 57.2921 90.5564 58.0977 90.6337 58.9118C90.7038 59.716 90.6647 60.5259 90.5172 61.3196C90.3785 62.1179 90.1478 62.8974 89.8296 63.6426C89.1426 65.1544 88.0141 66.4229 86.5924 67.281C85.1786 68.1747 83.5753 68.7252 81.9107 68.8886C80.99 68.9792 80.0612 68.9446 79.1498 68.7856C78.2467 68.6307 77.3767 68.3229 76.5771 67.8755C74.5518 66.6518 73.0331 64.7419 72.297 62.493C71.4821 60.2538 71.5777 57.7843 72.5633 55.6149C73.0899 54.4972 73.8204 53.4875 74.7172 52.6376C75.6314 51.8044 76.7278 51.1966 77.9187 50.8626C78.5034 50.6932 79.0895 50.5322 79.6766 50.4231C80.0685 50.346 80.4657 50.2983 80.8648 50.2804C80.9005 50.2829 80.9364 50.2779 80.9701 50.2657C81.0038 50.2535 81.0345 50.2343 81.0603 50.2095C81.0861 50.1846 81.1064 50.1546 81.1199 50.1215C81.1334 50.0883 81.1398 50.0526 81.1386 50.0168C81.1375 49.981 81.1288 49.9458 81.1131 49.9136C81.0976 49.8813 81.0753 49.8527 81.048 49.8296C81.0206 49.8065 80.9887 49.7894 80.9543 49.7794C80.9199 49.7693 80.8838 49.7667 80.8483 49.7715C80.4239 49.7685 79.9997 49.7952 79.579 49.8512C78.9667 49.965 78.3544 50.0788 77.7562 50.2681C76.4745 50.6268 75.2918 51.274 74.2987 52.16C73.3172 53.0483 72.5085 54.1106 71.9135 55.2931C70.791 57.6268 70.6377 60.3099 71.487 62.7563C72.2555 65.2345 73.8973 67.3497 76.1073 68.7089C77.0012 69.2203 77.9768 69.5734 78.991 69.7522C79.9951 69.9229 81.0174 69.9605 82.0313 69.864C83.8467 69.6741 85.593 69.0644 87.132 68.0832C88.7037 67.1024 89.9355 65.6618 90.6601 63.9568C90.9979 63.1451 91.2393 62.2964 91.379 61.4284C91.5209 60.5632 91.547 59.683 91.4565 58.8109C91.3496 57.945 91.1618 57.091 90.8957 56.2601Z"
          fill="#FF9900"
        />
        <path
          d="M75.9333 58.5284C76.1557 58.608 76.3919 58.6421 76.6277 58.6288C76.8636 58.6154 77.0943 58.5549 77.3064 58.4508C77.5184 58.3466 77.7074 58.201 77.8622 58.0225C78.0169 57.8441 78.1343 57.6363 78.2073 57.4117C78.3022 57.0416 78.2541 56.6494 78.0726 56.3133C77.8911 55.9771 77.5896 55.7217 77.2282 55.598C76.987 55.5397 76.735 55.5429 76.4954 55.6071C76.2557 55.6713 76.0359 55.7947 75.8562 55.9658C75.1383 56.5851 74.854 58.0435 75.9333 58.5284Z"
          fill="#020202"
        />
        <path
          d="M83.9693 57.0438C84.1949 57.132 84.439 57.1619 84.6793 57.1308C84.9195 57.0997 85.148 57.0086 85.3437 56.8659C85.5394 56.7231 85.696 56.5334 85.799 56.3142C85.902 56.095 85.9481 55.8534 85.9331 55.6116C85.9375 55.3043 85.8442 55.0035 85.6666 54.7527C85.489 54.5019 85.2363 54.314 84.9449 54.2161C83.397 53.8703 82.2778 55.6922 83.3683 56.7043C83.539 56.8634 83.7449 56.9797 83.9693 57.0438Z"
          fill="#020202"
        />
        <path
          d="M80.029 65.6722C79.4741 65.5545 78.9426 65.3453 78.4563 65.0533C77.8364 64.6773 77.3148 64.1594 76.9346 63.5421C76.5544 62.9248 76.3264 62.2259 76.2694 61.5031C76.2643 61.4363 76.2333 61.3742 76.1829 61.33C76.1325 61.2858 76.0668 61.2631 75.9999 61.2669C75.9659 61.2683 75.9326 61.2765 75.9018 61.291C75.8711 61.3054 75.8435 61.3259 75.8207 61.3511C75.798 61.3763 75.7804 61.4059 75.7692 61.4379C75.758 61.4701 75.7532 61.504 75.7553 61.538C75.7703 62.3672 75.9836 63.1807 76.3774 63.9106C76.7711 64.6405 77.3339 65.2655 78.0187 65.7334C78.5675 66.1243 79.1826 66.4127 79.8341 66.5847C80.8195 66.8248 81.8502 66.8066 82.8265 66.5318C84.402 66.052 85.7509 65.0185 86.6241 63.6223C87.0596 62.9453 87.3546 62.1878 87.4919 61.3947C87.6292 60.6016 87.6059 59.789 87.4234 59.0052C87.4164 58.9673 87.4018 58.9313 87.3804 58.8994C87.359 58.8674 87.3313 58.8402 87.2989 58.8194C87.2667 58.7985 87.2304 58.7846 87.1925 58.7783C87.1545 58.7721 87.1157 58.7736 87.0784 58.7829C87.0411 58.7909 87.0059 58.8063 86.9745 58.828C86.9432 58.8496 86.9164 58.8773 86.8958 58.9093C86.8752 58.9414 86.8611 58.9772 86.8542 59.0146C86.8475 59.0522 86.8481 59.0906 86.8562 59.1279C86.9799 59.8291 86.9619 60.5479 86.8033 61.2421C86.6447 61.9362 86.3486 62.5915 85.9326 63.1694C85.1357 64.3683 83.9325 65.2391 82.5444 65.6212C81.7232 65.8472 80.8586 65.8648 80.029 65.6722Z"
          fill="#020202"
        />
      </g>
      <defs>
        <clipPath id="clip0_2079_1522">
          <rect
            width="20.4908"
            height="20.4908"
            fill="white"
            transform="translate(69.2998 51.5938) rotate(-10.5277)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
function IconArrowUpDown({
  color = "currentColor",
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${className}`}
      {...props}
    >
      <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
    </svg>
  );
}
function IconClock({
  color = "currentColor",
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${className}`}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function IconVolumeX({
  color = "currentColor",
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${className}`}
      {...props}
    >
      <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
      <line x1="22" x2="16" y1="9" y2="15" />
      <line x1="16" x2="22" y1="9" y2="15" />
    </svg>
  );
}
function IconSettings({
  color = "currentColor",
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${className}`}
      {...props}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function IconVolume2({
  color = "currentColor",
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${className}`}
      {...props}
    >
      <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
      <path d="M16 9a5 5 0 0 1 0 6" />
      <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
    </svg>
  );
}

export {
  IconEdit,
  IconNextChat,
  IconOpenAI,
  IconVercel,
  IconGitHub,
  IconSeparator,
  IconArrowDown,
  IconArrowRight,
  IconUser,
  IconPlus,
  IconArrowElbow,
  IconSpinner,
  IconMessage,
  IconTrash,
  IconRefresh,
  IconStop,
  IconSidebar,
  IconMoon,
  IconSun,
  IconCopy,
  IconCheck,
  IconDownload,
  IconClose,
  IconArrowShare,
  IconUsers,
  IconExternalLink,
  IconChevronUpDown,
  IconPlay,
  PencilIcon,
  CorrectDocumentIcon,
  IconAudioLines,
  IconPencilLine,
  IconFileType,
  IconBrainCircuit,
  IconGraduationCap,
  IconBrainCog,
  IconLightbulb,
  IconWallet,
  IconHandshake,
  IconMic2,
  IconLibraryBig,
  IconHistory,
  IconBot,
  IconFileStack,
  IconFileHeart,
  IconXCircle,
  IconArrowBigDownDash,
  IconArrowBigUp,
  EditIcon,
  IconScanText,
  IconBotMessageSquare,
  IconBookPlus,
  IconAudioWaveform,
  IconSave,
  LinkedInIcon,
  TwitterIcon,
  FacebookIcon,
  IconSearch,
  IconUserRound,
  IconMonitorPlay,
  IconGlasses,
  ShareIcon,
  IconChevronRight,
  IconChevronLeft,
  IconHeart,
  IconHeartFill,
  IconUpgrades,
  IconCaretDown,
  IconSquareArrowUpRight,
  IconEye,
  IconEar,
  IconFlag,
  IconGlobe,
  IconClone,
  IconInfo,
  IconPlusSquareDiff,
  IconCopyright,
  IconNoImage,
  IconTestTubeDiagonal,
  IconTestTube,
  IconImage,
  IconFlask,
  IconNoAi,
  StarIcon,
  MapPinIcon,
  FileImageIcon,
  ImageDownloadIcon,
  SirenIcon,
  IconClipboard,
  IconPocketKnife,
  IconCrowm,
  IconFooterPhone,
  IconFooterMail,
  IconFooterLocation,
  IconCircleStop,
  TalkIcon,
  BurgerIcon,
  XIcon,
  IconChevronDown,
  IconClapperboard,
  IconMessageFull,
  LightMessageBubbleArrow,
  DarkMessageBubbleArrow,
  IconVideoCamera,
  IconPause,
  IconMusic,
  IconMic,
  HappyToHelpDraw,
  IconArrowUpDown,
  IconClock,
  IconVolumeX,
  IconSettings,
  IconVolume2,
};
