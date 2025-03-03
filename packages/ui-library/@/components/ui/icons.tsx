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
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
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
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
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
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.6669 5.83398L11.1919 10.584C10.9346 10.7452 10.6372 10.8307 10.3336 10.8307C10.03 10.8307 9.73252 10.7452 9.47524 10.584L2.00024 5.83398"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
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
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.3335 10.834C11.7142 10.834 12.8335 9.7147 12.8335 8.33398C12.8335 6.95327 11.7142 5.83398 10.3335 5.83398C8.95278 5.83398 7.8335 6.95327 7.8335 8.33398C7.8335 9.7147 8.95278 10.834 10.3335 10.834Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
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
        stroke-linecap="round"
        stroke-linejoin="round"
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
        stroke-linecap="round"
        stroke-linejoin="round"
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
function HappyToHelpDraw({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="330"
      height="330"
      viewBox="0 0 330 330"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <path
        d="M96.5255 192.006C96.5084 191.929 96.4761 191.856 96.4306 191.792C96.3852 191.727 96.3273 191.673 96.2606 191.631C96.1938 191.589 96.1193 191.561 96.0416 191.548C95.9638 191.536 95.8843 191.538 95.8077 191.557C89.9124 192.353 83.9162 191.924 78.194 190.298C78.061 190.264 77.9208 190.271 77.7924 190.32C77.664 190.368 77.5536 190.455 77.4762 190.568C69.5562 206.943 67.101 222.874 64.2663 226.423C63.6777 227.048 62.9675 227.546 62.1792 227.887C61.3909 228.227 60.5413 228.403 59.6826 228.403C54.9191 228.923 50.1572 229.571 45.4926 230.111C45.3291 230.121 45.1751 230.191 45.0591 230.306C44.9431 230.422 44.8732 230.576 44.8623 230.739C46.2632 245.725 49.4345 261.127 50.2545 266.863C50.2665 266.94 50.2973 267.013 50.3442 267.076C50.391 267.139 50.4526 267.189 50.5235 267.222C61.8969 262.673 75.4269 254.57 81.4362 243.957C89.4701 229.756 90.5112 203.735 91.6811 198.937C91.7685 198.577 92.3988 198.667 92.3988 199.026C92.4055 199.597 92.3757 200.167 92.3097 200.734C90.6432 214.167 88.9668 234.523 81.5253 245.934C81.4082 252.274 80.7168 258.59 79.4595 264.805C79.4448 264.876 79.445 264.949 79.46 265.02C79.475 265.091 79.5044 265.158 79.5466 265.218C79.5887 265.277 79.6426 265.326 79.7048 265.363C79.7671 265.401 79.8364 265.425 79.9083 265.434C91.0524 265.329 102.181 264.579 113.238 263.187C113.509 263.187 113.598 262.738 113.418 262.649C113.515 262.649 113.61 262.626 113.695 262.58C113.78 262.535 113.853 262.469 113.906 262.389C113.96 262.309 113.993 262.216 114.002 262.12C114.011 262.024 113.995 261.927 113.958 261.838C100.693 228.36 104.251 219.79 96.5255 192.006ZM81.4296 201.531C81.1607 201.711 80.9808 201.262 81.1607 201.082C83.8436 199.03 85.1636 196.332 86.0117 196.05C87.7178 196.05 84.8979 199.8 81.4346 201.531H81.4296Z"
        fill="#191919"
      />
      <path
        d="M230.962 136.112C230.974 136.255 231.032 136.391 231.127 136.5C231.223 136.608 231.35 136.683 231.491 136.713C231.632 136.743 231.779 136.727 231.911 136.668C232.042 136.608 232.151 136.508 232.221 136.382C243.183 136.382 311.028 136.922 317.049 136.651C317.318 137.011 317.856 137.011 317.948 136.562C318.36 133.916 318.57 131.243 318.577 128.565C319.072 118.369 321.631 85.0557 321.631 46.7015C321.683 46.6482 321.72 46.5827 321.739 46.5112C321.758 46.4396 321.759 46.3644 321.741 46.2925C321.723 46.2205 321.687 46.1543 321.637 46.1C321.587 46.0458 321.523 46.0052 321.453 45.9821C316.861 44.9162 264.676 42.3917 230.782 44.5449C230.153 44.5449 229.525 44.634 228.802 44.634C228.533 44.634 228.533 45.0861 228.802 45.0828C262.106 44.8155 291.641 44.5878 319.387 46.7906C319.922 46.8813 320.469 46.8813 321.004 46.7906C320.824 52.1828 316.879 134.315 316.879 135.483C311.487 135.483 238.161 135.483 232.14 135.663C231.511 124.7 229.086 56.2286 228.995 50.2061C228.998 50.1689 228.993 50.1315 228.981 50.0962C228.969 50.061 228.949 50.0286 228.924 50.0013C228.899 49.9739 228.868 49.952 228.834 49.937C228.8 49.9221 228.763 49.9144 228.725 49.9144C228.688 49.9144 228.651 49.9221 228.617 49.937C228.583 49.952 228.552 49.9739 228.527 50.0013C228.501 50.0286 228.482 50.061 228.47 50.0962C228.457 50.1315 228.453 50.1689 228.456 50.2061C228.324 80.5199 230.01 120.25 230.962 136.112Z"
        fill="#191919"
      />
      <path
        d="M321.452 154.623C318.244 153.879 291.766 152.377 266.728 152.377C239.641 152.377 230.263 153.275 228.806 153.275C228.537 153.275 228.537 153.727 228.806 153.725C262.109 153.457 319.595 155.451 320.051 155.408C319.871 160.799 319.214 197.578 319.034 201.622C318.108 200.401 317.019 199.312 315.799 198.386C315.799 198.386 315.978 197.218 315.978 197.127C316.018 196.104 315.736 195.095 315.172 194.24C314.608 193.386 313.79 192.73 312.834 192.365C312.654 192.365 312.385 192.365 312.385 192.545C312.385 193.01 313.413 193.441 314.002 194.162C314.756 195.031 315.143 196.158 315.081 197.307C315.113 198.465 314.765 199.601 314.091 200.543C314.063 200.565 314.04 200.593 314.024 200.625C314.008 200.657 313.998 200.692 313.996 200.728C313.995 200.764 314 200.8 314.013 200.833C314.026 200.866 314.046 200.897 314.071 200.922C314.096 200.948 314.127 200.967 314.16 200.98C314.194 200.993 314.229 200.999 314.265 200.997C314.301 200.995 314.336 200.986 314.368 200.969C314.4 200.953 314.428 200.93 314.451 200.902C314.974 200.418 315.348 199.795 315.528 199.105C316.812 200.365 317.93 201.784 318.853 203.328C318.584 210.068 318.224 216.718 317.863 223.458C317.533 223.118 315.134 220.937 313.459 219.054C313.281 218.874 312.921 219.143 313.101 219.323C313.819 220.313 314.449 221.21 315.167 222.11C316.017 223.026 316.917 223.896 317.863 224.715C317.863 225.075 316.785 242.801 316.785 244.126C311.393 244.126 297.284 244.215 295.578 244.215C295.155 243.266 295.192 243.7 292.253 239.002C288.189 232.51 281.434 216.45 275.179 211.685C274.91 211.505 274.639 211.956 274.819 212.134C280.83 217.143 289.295 239.011 294.319 244.035C290.814 244.035 277.515 243.855 274.37 243.855C270.198 233.945 266.858 224.088 265.744 220.402C263.599 213.335 262.865 207.601 269.338 204.067C270.089 204.442 287.473 208.501 291.265 208.986C291.711 207.691 292.071 206.368 292.342 205.026C294.608 208.878 293.012 212.616 294.679 216.977C295.55 219.049 296.666 221.01 298.003 222.818C298.363 223.268 299.082 222.908 298.812 222.369C295.548 216.924 295.182 215.975 294.948 210.867C294.783 207.176 294.276 204.79 291.265 201.97C289.176 200.016 286.607 198.455 285.064 196.04C280.586 189.034 287.438 180.319 282.277 172.765C282.096 172.498 281.654 172.765 281.828 173.035C285.68 179.066 280.013 188.285 283.267 195.5C284.957 199.251 289.397 201.47 291.534 204.217C291.443 204.397 290.544 207.902 290.455 207.902C286.95 207.182 273.295 204.486 269.877 203.678C269.967 203.498 269.787 203.318 269.607 203.318C268.223 203.642 266.941 204.305 265.876 205.246C264.81 206.187 263.995 207.377 263.502 208.71C262.246 212.126 262.928 216.178 263.862 219.584C265.409 225.225 270.877 239.638 272.758 244.025C248.295 243.741 238.965 244.073 231.508 244.294C230.88 233.331 228.453 164.86 228.363 158.837C228.366 158.8 228.362 158.763 228.349 158.727C228.337 158.692 228.318 158.66 228.292 158.632C228.267 158.605 228.236 158.583 228.202 158.568C228.168 158.553 228.131 158.545 228.094 158.545C228.056 158.545 228.019 158.553 227.985 158.568C227.951 158.583 227.92 158.605 227.895 158.632C227.87 158.66 227.85 158.692 227.838 158.727C227.826 158.763 227.821 158.8 227.824 158.837C227.779 169.892 227.873 180.947 228.184 192.002C228.514 203.503 229.891 238.55 230.249 244.571C230.262 244.715 230.32 244.851 230.416 244.959C230.511 245.067 230.639 245.141 230.779 245.171C230.92 245.201 231.067 245.185 231.198 245.126C231.33 245.066 231.438 244.966 231.508 244.84C242.471 244.84 310.316 245.38 316.337 245.111C316.607 245.469 317.143 245.469 317.236 245.02C317.648 242.374 317.858 239.7 317.864 237.022C318.359 226.827 320.92 193.515 320.92 155.159C321.811 155.163 321.813 154.707 321.452 154.623Z"
        fill="#191919"
      />
      <path
        d="M198.165 152.826C195.446 152.569 192.711 152.54 189.987 152.737C189.932 152.744 189.882 152.77 189.845 152.812C189.809 152.853 189.788 152.906 189.788 152.962C189.788 153.017 189.809 153.07 189.845 153.112C189.882 153.153 189.932 153.179 189.987 153.186C191.307 153.186 218.498 155.621 218.552 155.613C218.372 161.004 214.879 243.047 214.879 244.218C209.487 244.218 136.161 244.218 130.14 244.398C129.601 234.604 127.355 175.027 127.264 169.364C127.267 169.327 127.262 169.29 127.25 169.254C127.238 169.219 127.218 169.187 127.193 169.159C127.168 169.132 127.137 169.11 127.103 169.095C127.069 169.08 127.032 169.073 126.994 169.073C126.957 169.073 126.92 169.08 126.886 169.095C126.852 169.11 126.821 169.132 126.796 169.159C126.77 169.187 126.751 169.219 126.739 169.254C126.727 169.29 126.722 169.327 126.725 169.364C126.537 210.908 128.21 224.324 128.705 244.667C128.717 244.811 128.775 244.947 128.87 245.055C128.965 245.163 129.093 245.238 129.234 245.268C129.375 245.299 129.522 245.283 129.653 245.223C129.785 245.164 129.893 245.064 129.964 244.938C140.926 244.938 208.771 245.477 214.792 245.207C215.062 245.566 215.599 245.566 215.691 245.117C216.103 242.471 216.313 239.798 216.32 237.12C216.897 225.05 219.375 193.085 219.375 155.166C219.422 155.115 219.457 155.055 219.478 154.989C219.499 154.923 219.505 154.854 219.497 154.785C219.488 154.717 219.465 154.651 219.428 154.593C219.391 154.534 219.342 154.484 219.285 154.447C219.054 154.331 198.404 152.843 198.165 152.826Z"
        fill="#191919"
      />
      <path
        d="M222.067 136.922C221.717 135.292 200.099 78.842 196.367 69.8858C194.567 65.5661 193.562 63.0778 189.087 53.0805C189.267 52.8115 188.909 52.3677 188.549 52.4519C182.827 53.7719 140.892 70.9715 137.597 72.402C119.903 80.0828 112.123 84.0147 103.181 88.4862C102.911 88.5753 103.181 89.0258 103.45 88.8459C124.011 79.299 163.55 62.1506 187.201 54.0689C187.702 53.9131 188.184 53.7022 188.638 53.4402C195.392 70.6299 220.543 136.125 220.628 136.29C215.678 138.447 148.367 167.805 142.975 170.41C141.628 167.714 136.033 156.656 134.272 153.91C134.245 153.856 134.199 153.814 134.142 153.792C134.085 153.77 134.022 153.771 133.965 153.793C133.909 153.816 133.863 153.859 133.836 153.914C133.81 153.969 133.806 154.032 133.824 154.09C134.924 157.169 140.653 168.647 142.001 171.433C142.071 171.558 142.182 171.655 142.314 171.708C142.447 171.761 142.594 171.767 142.73 171.725C142.867 171.683 142.985 171.595 143.065 171.477C143.144 171.358 143.181 171.216 143.169 171.074C163.596 162.051 222.344 137.199 222.067 136.922Z"
        fill="#191919"
      />
      <path
        d="M117.378 118.769C117.35 118.714 117.304 118.672 117.247 118.65C117.19 118.628 117.127 118.629 117.07 118.652C117.014 118.674 116.968 118.717 116.942 118.772C116.915 118.827 116.911 118.89 116.929 118.948C118.044 122.113 123.722 134.153 125.195 137.191C125.547 137.914 126.723 137.28 126.274 136.562C124.837 133.506 119.138 121.522 117.378 118.769Z"
        fill="#191919"
      />
      <path
        d="M105.787 93.5186C105.76 93.4641 105.713 93.4218 105.656 93.4001C105.599 93.3785 105.536 93.379 105.479 93.4017C105.423 93.4243 105.377 93.4674 105.351 93.5224C105.325 93.5774 105.32 93.6403 105.338 93.6984C106.341 96.9456 108.354 100.977 110.011 104.841C110.369 105.56 111.433 104.938 111.088 104.212C109.568 100.531 107.797 96.9576 105.787 93.5186Z"
        fill="#191919"
      />
      <path
        d="M137.687 138.539C134.854 139.483 130.733 145.364 126.185 138.628C126.004 138.361 125.646 138.628 125.735 138.899C126.725 140.879 128.517 142.988 131.036 142.763C133.696 142.247 136.121 140.893 137.956 138.899C138.136 138.719 137.956 138.448 137.687 138.539Z"
        fill="#191919"
      />
      <path
        d="M139.664 141.144C137.905 142.787 135.904 144.15 133.733 145.188C133.553 145.278 133.643 145.637 133.912 145.637C136.333 144.821 138.521 143.435 140.293 141.595C140.305 141.516 140.295 141.435 140.264 141.361C140.233 141.287 140.182 141.224 140.117 141.177C140.052 141.13 139.975 141.103 139.895 141.097C139.815 141.091 139.735 141.108 139.664 141.144Z"
        fill="#191919"
      />
      <path
        d="M141.821 143.751C140.958 143.895 139.763 146.096 135.531 147.614C135.262 147.711 135.44 148.065 135.709 147.974C138.461 147.385 141.939 145.078 142.09 144.014C142.18 143.931 142 143.751 141.821 143.751Z"
        fill="#191919"
      />
      <path
        d="M143.618 147.165C143.707 146.986 143.529 146.626 143.258 146.717C138.846 149.779 134.852 152.327 129.6 153.455C129.545 153.472 129.499 153.509 129.47 153.558C129.441 153.607 129.431 153.665 129.442 153.721C129.453 153.777 129.485 153.827 129.531 153.861C129.577 153.895 129.633 153.911 129.69 153.906C132.29 153.473 134.825 152.718 137.237 151.658C138.828 150.81 142.725 148.706 143.618 147.165Z"
        fill="#191919"
      />
      <path
        d="M124.298 149.233C124.027 149.771 124.747 150.13 125.106 149.681C125.617 148.056 125.771 146.339 125.555 144.649C125.411 142.385 125.111 140.133 124.657 137.91C124.657 137.64 124.207 137.731 124.207 137.999C124.387 140.156 124.469 142.314 124.657 144.469C124.826 146.066 124.704 147.679 124.298 149.233Z"
        fill="#191919"
      />
      <path
        d="M24.7318 239.182C23.5206 238.622 22.3751 237.929 21.3163 237.116C20.3263 235.951 21.9466 235.136 23.2039 234.33C23.9233 234.509 41.7153 232.981 42.5238 232.713C42.7944 232.623 42.8835 231.813 42.5238 231.723C41.806 231.633 23.5636 233.25 23.2947 233.34C22.2334 231.718 20.5944 230.562 18.711 230.106C17.6898 229.993 16.6579 230.18 15.741 230.643C15.0216 229.835 11.9905 227.868 10.9774 230.465C10.0996 232.719 10.7217 235.405 10.8883 237.653C11.281 242.921 7.2237 246.698 8.46285 251.851C9.2004 254.925 11.5401 255.895 13.2247 254.547C12.5734 253.13 12.214 251.596 12.1678 250.037C12.1216 248.478 12.3896 246.925 12.9558 245.472C13.332 244.399 13.7428 243.398 14.124 242.325C15.571 238.253 14.0233 231.856 17.4487 231.094C19.5937 230.615 21.2223 232.171 22.6594 233.61C22.0779 233.825 21.5326 234.128 21.0424 234.508C20.5874 234.812 20.2559 235.269 20.1077 235.797C19.9595 236.324 20.0043 236.887 20.2339 237.384C21.3775 238.765 22.9129 239.768 24.6378 240.26C23.4356 241.076 22.3988 242.112 21.582 243.314C20.5326 242.769 19.5126 242.169 18.5262 241.517C18.2572 241.428 18.0774 241.697 18.2572 241.877C19.0223 242.797 19.933 243.587 20.9533 244.213C20.6184 244.763 20.318 245.333 20.0541 245.921C19.2456 245.561 18.3463 245.201 17.5378 244.753C17.5147 244.731 17.4871 244.714 17.457 244.703C17.427 244.693 17.395 244.689 17.3632 244.692C17.3315 244.694 17.3007 244.704 17.2728 244.719C17.245 244.735 17.2207 244.756 17.2016 244.782C17.1825 244.807 17.1691 244.836 17.1621 244.867C17.1551 244.899 17.1548 244.931 17.1611 244.962C17.1675 244.993 17.1804 245.023 17.1989 245.049C17.2175 245.075 17.2414 245.096 17.2689 245.112C17.9437 245.836 18.7331 246.443 19.6053 246.909C19.1248 248.205 18.5541 249.466 17.8975 250.683C16.8413 252.181 15.422 253.387 13.7725 254.187C13.5019 254.278 13.6818 254.638 13.9524 254.638C17.9124 254.098 19.1631 250.678 20.5111 247.358C21.1686 247.628 21.8684 247.78 22.5786 247.808C22.7076 247.804 22.8312 247.756 22.9283 247.671C23.0254 247.586 23.0901 247.47 23.1114 247.343C23.1326 247.215 23.109 247.085 23.0446 246.973C22.9803 246.861 22.8791 246.775 22.7584 246.729C22.3096 246.549 21.1414 246.37 20.9616 246.28L21.7701 244.662C21.8592 244.753 22.4878 244.842 22.6677 244.932C22.8721 245.007 23.0899 245.037 23.3068 245.021C23.5238 245.006 23.735 244.944 23.9266 244.842C24.0147 244.766 24.0786 244.666 24.1105 244.554C24.1425 244.443 24.1411 244.324 24.1065 244.213C24.0157 244.033 22.5786 243.494 22.3987 243.673C22.9029 242.961 23.5082 242.326 24.1956 241.788C24.5553 241.517 26.263 240.708 26.1756 240.08C28.512 240.529 43.1607 243.314 43.5187 243.225C43.6986 243.136 43.8784 242.865 43.6986 242.685C43.2432 242.238 27.6969 239.633 24.7318 239.182ZM13.86 233.252C13.7131 234.514 14.1306 238.202 13.4112 240.53C13.0515 241.698 11.1012 246.47 10.8058 247.625C10.5085 248.693 10.4592 249.815 10.6616 250.905C10.8641 251.996 11.313 253.025 11.974 253.915C11.632 253.992 11.2754 253.974 10.9428 253.863C10.6101 253.753 10.314 253.553 10.0864 253.286C9.46906 252.574 9.06429 251.702 8.91825 250.77C8.3787 246.645 11.1688 243.086 11.6143 238.997C11.913 236.24 10.6144 230.645 12.4228 230.102C13.2313 229.743 14.8483 230.731 15.2988 230.911C14.8998 231.169 14.5635 231.514 14.3146 231.919C14.0657 232.324 13.9104 232.779 13.86 233.252Z"
        fill="#191919"
      />
      <path
        d="M97.3397 284.922C96.9154 286.212 96.3423 287.449 95.6319 288.607C94.5297 289.753 93.5645 288.247 92.6619 287.079C92.751 286.27 89.0666 268.836 88.7019 268.118C88.6128 267.848 87.8043 267.939 87.7119 268.208C87.7119 269.016 91.4871 286.81 91.6719 287.168C90.1935 288.429 89.2338 290.192 88.9775 292.118C88.9868 293.144 89.2991 294.144 89.8751 294.994C89.1573 295.802 87.5502 299.081 90.2348 299.756C92.5811 300.345 95.0907 299.412 97.4238 298.947C102.465 297.941 106.725 301.432 111.711 299.666C114.666 298.619 115.262 296.027 113.779 294.552C113.51 294.283 110.809 297.37 104.793 295.9C103.712 295.636 102.638 295.353 101.557 295.091C97.3413 294.071 91.2314 296.527 90.0549 293.111C89.3421 291.042 90.6836 289.247 91.9425 287.63C92.243 288.178 92.6044 288.691 93.02 289.158C93.3716 289.587 93.87 289.87 94.4186 289.953C94.9673 290.036 95.5272 289.913 95.99 289.606C97.208 288.31 98.0202 286.686 98.3264 284.934C98.7905 285.458 99.3013 285.939 99.8526 286.371C100.032 286.462 101.74 287.63 101.74 287.539C101.381 288.618 100.75 289.696 100.392 290.775C100.303 291.044 100.572 291.223 100.752 291.044C101.574 290.172 102.244 289.168 102.732 288.074C103.316 288.323 103.917 288.533 104.529 288.702C104.326 289.601 104.025 290.476 103.631 291.309C103.616 291.366 103.62 291.427 103.642 291.481C103.664 291.536 103.704 291.582 103.754 291.613C103.805 291.643 103.864 291.656 103.923 291.65C103.982 291.644 104.037 291.618 104.08 291.578C104.73 290.816 105.219 289.929 105.517 288.973C108.69 289.818 110.985 289.963 113.426 293.826C113.591 294.099 113.874 293.826 113.874 293.555C112.797 289.781 109.292 288.882 105.877 287.894C106.101 287.198 106.163 286.46 106.057 285.737C106.04 285.606 105.977 285.485 105.877 285.397C105.778 285.31 105.65 285.261 105.518 285.261C105.385 285.261 105.258 285.31 105.158 285.397C105.059 285.485 104.995 285.606 104.979 285.737C104.888 286.186 104.799 287.445 104.799 287.534C104.212 287.379 103.64 287.168 103.092 286.905C103.182 286.816 103.182 286.186 103.271 286.006C103.516 284.787 102.913 284.434 102.463 284.66C102.283 284.749 101.923 286.277 102.103 286.366C101.343 285.961 100.646 285.446 100.036 284.838C99.6777 284.48 98.7785 282.858 98.1498 283.132C98.3297 280.705 99.318 265.878 99.1398 265.518C99.1057 265.469 99.0619 265.428 99.0112 265.397C98.9605 265.366 98.9038 265.345 98.8449 265.337C98.7859 265.328 98.7258 265.332 98.6684 265.348C98.611 265.364 98.5575 265.392 98.5112 265.429C98.0574 266.231 97.4288 281.957 97.3397 284.922ZM92.8451 296.424C95.2511 296.037 97.6894 295.886 100.125 295.975C101.379 296.18 106.23 297.51 107.494 297.682C108.588 297.859 109.708 297.781 110.767 297.454C111.826 297.127 112.795 296.559 113.599 295.796C113.723 296.112 113.755 296.457 113.691 296.79C113.627 297.124 113.471 297.433 113.239 297.682C111.259 299.944 107.723 299.516 104.793 298.85C102.834 298.274 100.812 297.941 98.7719 297.86C96.7028 297.906 94.7244 298.635 92.751 298.85C89.5649 299.195 89.0303 298.267 90.2348 295.256C90.5645 295.622 90.967 295.915 91.4165 296.116C91.866 296.317 92.3526 296.422 92.8451 296.424Z"
        fill="#191919"
      />
      <path
        d="M97.0692 115.984C91.7479 120.72 87.3312 126.383 84.0342 132.698C83.8543 132.967 84.3048 133.147 84.3939 132.967C88.9291 125.242 94.9833 118.517 102.191 113.198C104.794 111.293 107.771 109.568 108.571 108.974C108.842 108.705 108.753 108.078 108.302 108.255C104.239 110.334 100.463 112.932 97.0692 115.984Z"
        fill="#191919"
      />
      <path
        d="M123.13 102.145C121.679 101.661 117.577 102.765 116.12 103.224C113.825 103.93 111.667 105.024 109.74 106.458C109.685 106.507 109.651 106.576 109.645 106.649C109.64 106.722 109.662 106.795 109.708 106.852C109.754 106.91 109.82 106.948 109.892 106.958C109.965 106.969 110.039 106.951 110.1 106.908C119.793 101.922 121.65 103.292 123.219 102.505C123.489 102.505 123.399 102.236 123.13 102.145Z"
        fill="#191919"
      />
      <path
        d="M125.375 104.841C122.353 104.883 119.366 105.492 116.569 106.638C116.533 106.659 116.505 106.691 116.489 106.73C116.472 106.768 116.469 106.811 116.479 106.852C116.49 106.892 116.513 106.928 116.545 106.955C116.578 106.981 116.618 106.996 116.66 106.997C117.82 106.874 118.963 106.633 120.074 106.278C124.034 105.463 124.574 105.773 125.375 105.201C125.646 105.201 125.648 104.927 125.375 104.841Z"
        fill="#191919"
      />
      <path
        d="M126.094 107.266C125.291 106.999 124.939 107.666 119.356 108.525C119.085 108.525 119.176 108.974 119.445 108.974C119.986 108.933 125.56 108.52 126.274 107.806C126.454 107.537 126.363 107.266 126.094 107.266Z"
        fill="#191919"
      />
      <path
        d="M117.109 120.925C116.673 118.821 115.911 117.021 117.737 114.82C119.542 112.845 121.885 111.439 124.477 110.776C124.53 110.758 124.575 110.721 124.603 110.672C124.63 110.624 124.639 110.567 124.628 110.512C124.617 110.457 124.587 110.408 124.542 110.374C124.498 110.34 124.443 110.323 124.387 110.327C121.473 110.666 118.802 112.114 116.929 114.371C116.173 115.343 115.712 116.512 115.601 117.738C115.489 118.965 115.732 120.197 116.3 121.29C116.569 121.735 117.201 121.374 117.109 120.925Z"
        fill="#191919"
      />
      <path
        d="M114.233 119.308C113.399 118.182 112.733 116.941 112.253 115.624C112.164 115.264 111.621 115.446 111.714 115.804C112.053 117.182 112.631 118.49 113.421 119.668C114.091 120.895 114.939 122.015 115.938 122.993C115.984 123.019 116.036 123.032 116.089 123.031C116.142 123.03 116.194 123.015 116.24 122.988C116.285 122.961 116.323 122.922 116.349 122.876C116.374 122.829 116.387 122.777 116.386 122.724C116.236 121.651 114.934 120.534 114.233 119.308Z"
        fill="#191919"
      />
      <path
        d="M257.111 85.2505C256.842 85.1614 256.662 85.4304 256.931 85.6102C258.819 86.6893 260.715 87.9334 262.592 89.0257C263.213 89.3854 284.537 101.764 285.598 102.236C284.07 102.594 276.964 104.912 274.994 105.649C270.621 107.285 264.145 110.434 261.155 113.918C261.066 114.007 261.244 114.185 261.335 114.096C263.67 112.052 266.307 110.383 269.153 109.146C273.934 107.036 278.823 105.179 283.8 103.582C284.682 103.395 285.553 103.155 286.407 102.864C286.496 102.864 286.767 104.122 286.407 104.212C278.518 106.702 262.061 112.385 259.268 120.207C258.9 121.131 258.79 122.136 258.948 123.117C259.107 124.098 259.528 125.017 260.167 125.778C261.842 127.606 264.841 127.593 267.087 127.396C269.786 127.02 272.436 126.356 274.994 125.416C280.911 123.56 286.631 121.123 292.068 118.14C292.113 118.438 292.113 118.741 292.068 119.039C284.998 123.312 277.337 126.522 269.333 128.565C259.256 130.687 253.689 124.596 247.223 119.937C242.731 116.7 238.057 113.647 233.653 110.413C233.473 110.233 233.204 110.591 233.384 110.771C237.344 113.827 241.403 116.762 245.429 119.757C248.68 122.449 252.07 124.968 255.585 127.306C262.185 131.215 267.379 130.606 273.735 128.745C280.471 126.695 286.907 123.764 292.875 120.028C293.144 120.028 293.324 119.848 293.324 119.488C293.324 116.386 292.758 116.713 290.718 115.894C289.439 115.356 288.114 114.934 286.758 114.635C286.488 114.546 286.308 114.995 286.578 115.084C288.105 115.804 289.633 116.612 291.161 117.331C290.376 117.796 289.566 118.215 288.735 118.589C287.87 117.727 287.115 116.762 286.488 115.714C285.666 114.256 285.205 112.623 285.142 110.95C285.08 109.277 285.418 107.614 286.128 106.098C286.308 105.74 285.768 105.649 285.59 105.829C282.985 109.41 283.841 115.795 287.656 119.039C282.541 121.47 266.625 128.627 261.866 125.598C261.071 125.064 260.497 124.26 260.249 123.335C260.001 122.41 260.097 121.427 260.518 120.567C263.137 113.579 278.967 108.219 285.14 105.74C287.181 104.915 287.747 105.166 287.747 103.853C287.747 103.133 287.836 102.505 287.207 101.965C286.384 101.284 285.478 100.711 284.511 100.257C263.239 88.077 264.072 88.5918 257.111 85.2505Z"
        fill="#191919"
      />
      <path
        d="M280.115 76.1758C276.888 83.8417 277.924 91.6049 285.148 95.6755C286.671 96.5804 288.372 97.1462 290.134 97.3343C291.896 97.5224 293.678 97.3283 295.358 96.7653C297.038 96.2023 298.578 95.2836 299.871 94.0719C301.164 92.8602 302.18 91.3839 302.851 89.7437C304.257 85.3638 304.098 80.6316 302.402 76.3556C302.311 75.9959 301.773 75.9959 301.593 76.2649C294.498 76.085 287.484 76.085 280.386 76.085C280.364 76.066 280.338 76.0529 280.31 76.0472C280.281 76.0415 280.252 76.0433 280.225 76.0525C280.197 76.0617 280.173 76.0779 280.154 76.0996C280.134 76.1212 280.121 76.1475 280.115 76.1758Z"
        fill="#191919"
      />
      <path
        d="M309.949 89.3855H309.86C308.153 89.9234 307.153 89.237 305.636 88.6661C305.184 88.5011 303.684 88.2916 304.288 89.2948C304.906 90.1812 305.777 90.8611 306.786 91.2458C307.796 91.6304 308.898 91.702 309.949 91.4513C315.878 90.1792 316.77 80.8913 310.4 79.4063C309.471 79.2035 308.505 79.255 307.603 79.5556C306.702 79.8562 305.898 80.3946 305.277 81.1141C304.867 81.5233 304.917 82.1932 305.456 82.1932C305.636 82.1932 305.727 82.0133 305.816 81.9226C306.32 81.5016 306.918 81.2084 307.559 81.0676C308.201 80.9269 308.867 80.9428 309.501 81.1141C310.386 81.3546 311.173 81.868 311.749 82.5814C312.326 83.2947 312.663 84.1717 312.713 85.0877C312.763 86.0036 312.522 86.9119 312.026 87.6835C311.53 88.4551 310.803 89.0506 309.949 89.3855Z"
        fill="#191919"
      />
      <path
        d="M298.538 51.6449C298.538 51.4651 298.358 51.376 298.269 51.5558C295.938 56.2154 289.405 54.3872 287.214 58.6508C286.811 59.5062 286.633 60.4501 286.696 61.3935C286.759 62.3369 287.061 63.2487 287.574 64.043C288.818 66.0973 291.273 66.5741 292.689 68.003C293.174 68.368 293.514 68.8943 293.645 69.4872C293.777 70.0801 293.693 70.7006 293.408 71.237C292.717 72.1249 291.823 72.8339 290.801 73.3045C290.621 73.3952 290.801 73.75 290.981 73.6642C292.581 72.9085 294.665 71.9564 294.665 69.8906C294.665 67.4635 292.24 66.2953 290.54 65.2178C289.644 64.7455 288.914 64.01 288.448 63.1103C287.982 62.2106 287.803 61.1898 287.935 60.1853C288.635 55.2749 297.137 56.7203 298.538 51.6449Z"
        fill="#FF9900"
      />
      <path
        d="M75.4128 86.955C75.9524 89.831 78.6155 100.082 79.1864 102.501C79.2722 102.861 79.8167 102.681 79.7259 102.321C79.3662 99.896 76.9407 89.2023 76.4919 86.2373C76.4919 85.9667 76.1322 85.7901 75.9524 85.7868C70.3077 85.5346 64.8764 83.5556 60.3926 80.1172C55.9088 76.6789 52.5886 71.947 50.8806 66.561C49.3959 61.1667 49.5895 55.4482 51.4356 50.1666C53.2817 44.8851 56.6927 40.2911 61.2146 36.9963C70.8753 30.1587 88.7514 28.7562 100.754 34.749C112.139 40.4349 118.244 51.7127 114.503 64.3137C110.378 78.1737 96.0098 86.2406 82.2422 86.2406C81.9732 86.2406 81.7934 86.5095 81.7026 86.7785C81.074 91.8935 80.4453 97.0233 79.9965 102.145C79.9058 102.684 80.81 102.775 80.8941 102.236C81.6647 97.3005 82.1531 92.2598 82.691 87.2289C106.596 86.2175 120.311 67.1402 115.856 50.655C112.931 39.8475 102.229 30.6488 85.5719 29.8964C71.8769 29.2793 58.4046 33.4769 51.8739 45.8024C41.9228 64.5744 55.169 85.5129 75.4128 86.955Z"
        fill="#191919"
      />
      <path
        d="M90.7798 134.764C90.6923 134.584 90.4201 134.675 90.4201 134.944C90.7758 136.381 90.7817 137.883 90.4372 139.323C90.0926 140.763 89.4078 142.099 88.4401 143.22C86.0459 146.474 81.1256 150.068 80.4425 153.823C80.1653 155.349 80.497 156.958 80.1719 158.496C79.3175 161.238 77.9108 163.776 76.0387 165.954C74.26 168.483 72.0787 172.059 73.1644 175.299C73.2535 175.57 73.793 175.57 73.793 175.21C72.968 167.762 81.3401 163.767 81.3401 157.148C81.1791 155.962 81.2723 154.756 81.6137 153.61C81.9551 152.463 82.5368 151.402 83.3201 150.498C84.7408 148.683 86.465 147.084 87.9022 145.383C87.9557 146.737 87.8655 148.093 87.6332 149.427C87.6332 150.153 88.5308 150.132 88.5308 149.607C88.7681 148.393 88.7987 147.147 88.6216 145.923C88.6285 145.574 88.5346 145.23 88.351 144.933C90.7154 141.966 92.4265 138.166 90.7798 134.764Z"
        fill="#191919"
      />
      <path
        d="M72.8074 164.419C75.4194 161.806 75.8121 159.753 76.2213 156.422C76.5859 153.452 76.7707 150.587 78.5577 148.153C81.5458 144.083 86.8918 141.938 88.5319 136.651C88.6227 136.471 88.263 136.382 88.1739 136.562C86.5437 140.796 81.1218 143.646 78.1089 147.434C76.4505 149.707 75.5401 152.44 75.5035 155.253C75.0696 158.93 75.0613 161.028 72.2679 163.88C70.0882 166.104 66.5638 168.742 67.4152 172.326C67.501 172.687 68.1346 172.597 68.0439 172.237C67.7749 168.732 70.5601 166.665 72.8074 164.419Z"
        fill="#191919"
      />
      <path
        d="M70.4711 158.128C72.1063 153.838 72.0205 148.289 75.5036 144.74C77.5975 142.605 80.3942 141.139 83.0507 138.09C85.7072 135.041 86.6807 132.401 88.2631 131.35C88.6734 131.053 89.1521 130.864 89.6549 130.801C90.1576 130.738 90.6682 130.803 91.139 130.99C91.408 131.081 91.5928 130.804 91.3189 130.631C90.6722 130.265 89.9212 130.129 89.1873 130.243C88.4534 130.357 87.7795 130.716 87.2747 131.261C86.0916 132.575 85.066 134.022 84.2189 135.574C81.4238 139.59 78.8696 140.92 76.3121 143.121C69.4828 149.007 72.8834 154.506 67.8641 161.363C65.5822 164.482 62.2541 167.929 62.9141 172.146C62.9999 172.687 63.8134 172.506 63.8134 172.057C63.4273 166.667 68.3773 163.611 70.4711 158.128Z"
        fill="#191919"
      />
      <path
        d="M129.69 155.253C128.982 154.336 128.087 153.581 127.064 153.038C126.041 152.496 124.914 152.178 123.758 152.107C121.601 152.006 120.07 153.72 118.545 154.983C115.055 157.893 111.864 161.144 109.02 164.688C108.56 165.266 106.57 168.732 105.966 168.732C106.389 168.935 106.846 169.057 107.314 169.092C107.674 169.092 107.763 169.721 107.403 169.81C104.258 170.349 101.202 166.935 99.2256 164.957C93.7938 159.525 92.1537 155.59 87.9033 154.265C86.1232 153.605 84.1555 153.669 82.422 154.443C82.422 158.543 82.2983 161.794 79.9058 164.868C77.2547 168.241 75.4102 172.175 74.5136 176.37C74.3486 177.269 72.7101 176.292 72.1772 176.01C70.7202 175.236 68.3145 173.04 66.516 174.123C66.4269 174.123 66.4269 174.213 66.3362 174.303C64.899 176.01 62.2112 183.018 62.5626 183.288C70.8737 189.613 81.5244 191.227 91.6769 190.928C94.5962 191.007 97.5162 190.796 100.394 190.298C101.476 190.042 101.384 189.58 101.562 188.412C97.9083 187.324 94.3597 185.911 90.9591 184.188C87.4803 182.35 84.2239 180.119 81.2538 177.538C81.074 177.358 81.2538 177.177 81.4337 177.269C91.3634 182.308 100.546 189.834 110.819 185.536C120.702 181.401 125.541 170.91 128.251 161.281C128.528 160.291 128.766 159.301 129.059 158.227C129.447 157.282 129.661 156.274 129.69 155.253Z"
        fill="#FF9900"
      />
      <path
        d="M93.2961 142.23C94.1937 142.529 94.7811 141.654 94.2861 141.151C93.6838 140.549 92.4711 140.9 92.6691 141.691C92.7262 141.822 92.8122 141.939 92.9208 142.032C93.0294 142.126 93.1576 142.193 93.2961 142.23Z"
        fill="#191919"
      />
      <path
        d="M97.3399 144.2C97.4931 143.491 97.3641 142.749 96.9802 142.133C96.6185 141.335 96.1661 140.582 95.6322 139.887C95.5414 139.707 95.2725 139.796 95.2725 140.067C95.9835 141.295 96.3553 142.69 96.3499 144.11C96.2608 144.38 96.1717 144.829 96.5298 144.92C97.0693 145.009 97.2492 144.469 97.3399 144.2Z"
        fill="#191919"
      />
      <path
        d="M93.025 146.805C93.3134 147.23 93.7506 147.53 94.2501 147.647C94.7495 147.763 95.2745 147.688 95.7211 147.436C96.9256 146.834 96.6616 145.886 96.0808 146.177C95.8397 146.361 95.5648 146.495 95.2717 146.572C94.9786 146.649 94.6732 146.667 94.373 146.626C93.8539 146.392 93.4383 145.977 93.2048 145.457C93.1471 145.345 92.8946 145.292 92.8649 145.457C92.7555 145.911 92.8123 146.39 93.025 146.805Z"
        fill="#191919"
      />
      <path
        d="M91.8574 149.232C92.7474 149.845 93.7918 150.195 94.8713 150.243C95.9508 150.29 97.0219 150.033 97.9624 149.501C100.228 148.003 100.079 145.084 99.3995 142.763C98.9633 140.913 98.1017 139.189 96.8833 137.73C96.7067 137.547 96.4345 137.73 96.5236 137.91C97.3733 140.032 99.5513 143.489 98.86 146.536C98.7229 147.423 98.2605 148.228 97.563 148.792C96.8654 149.357 95.9826 149.642 95.0864 149.592C94.2518 149.685 93.4074 149.56 92.6355 149.229C91.8636 148.898 91.1908 148.373 90.6826 147.704C90.5935 147.614 90.4136 147.704 90.5044 147.794C90.8842 148.335 91.3399 148.82 91.8574 149.232Z"
        fill="#191919"
      />
      <path
        d="M91.7678 155.074C92.1862 154.51 92.6685 153.998 93.205 153.546C93.2655 153.518 93.3168 153.474 93.3528 153.418C93.3888 153.363 93.408 153.298 93.408 153.231C93.408 153.165 93.3888 153.1 93.3528 153.044C93.3168 152.989 93.2655 152.944 93.205 152.917C91.011 151.185 88.2711 150.293 85.478 150.401C85.4078 150.405 85.3415 150.434 85.2916 150.484C85.2417 150.533 85.2118 150.6 85.2074 150.67C85.1184 151.386 85.1184 152.11 85.2074 152.826C87.5847 152.817 89.8958 153.608 91.7678 155.074Z"
        fill="#FF9900"
      />
      <path
        d="M98.7777 136.742C98.8027 136.707 98.8202 136.667 98.8291 136.625C98.8381 136.583 98.8383 136.539 98.8298 136.497C98.8213 136.455 98.8043 136.415 98.7797 136.38C98.7551 136.344 98.7236 136.314 98.687 136.292C98.1867 136.16 97.661 136.16 97.1607 136.292C95.4815 136.342 93.8065 136.099 92.2107 135.574C91.9418 135.483 91.851 135.754 92.0309 135.932C93.508 136.931 95.29 137.376 97.0634 137.191C97.6986 137.191 98.418 137.191 98.7777 136.742Z"
        fill="#191919"
      />
      <path
        d="M98.0575 135.214C98.0575 135.034 97.7885 134.854 97.6978 134.764C96.8316 134.211 95.8465 133.871 94.8235 133.774C94.4638 133.774 94.0133 133.685 93.6553 133.685C93.6134 133.686 93.5732 133.701 93.5406 133.727C93.508 133.754 93.4849 133.79 93.4746 133.83C93.4644 133.871 93.4676 133.914 93.4838 133.952C93.5 133.991 93.5284 134.023 93.5645 134.044C95.3696 134.046 98.0575 136.532 98.0575 135.214Z"
        fill="#191919"
      />
      <path
        d="M97.5147 131.979C96.7899 131.366 95.9396 130.92 95.0236 130.671C94.1076 130.423 93.1482 130.379 92.2132 130.541C92.1486 130.561 92.0932 130.603 92.0575 130.66C92.0218 130.717 92.0083 130.785 92.0194 130.851C92.0306 130.918 92.0657 130.978 92.1182 131.02C92.1706 131.063 92.2367 131.084 92.304 131.081C93.1536 131.018 94.0066 131.146 94.7998 131.457C95.593 131.768 96.306 132.254 96.886 132.878C97.2457 133.238 97.6054 133.868 98.0542 133.955C98.4222 133.955 98.8347 133.084 97.5147 131.979Z"
        fill="#191919"
      />
      <path
        d="M93.9244 139.436C94.2841 139.258 94.1933 138.808 93.8353 138.628C93.4952 138.601 93.1539 138.663 92.8453 138.808C92.2133 139.23 91.7711 139.798 92.5763 139.798C93.0427 139.753 93.4983 139.631 93.9244 139.436Z"
        fill="#191919"
      />
      <path
        d="M130.858 208.181C140.832 208.092 165.903 208.451 168.599 208.451C169.047 208.451 168.958 207.821 168.599 207.821C167.162 207.641 165.629 207.552 164.196 207.463C164.196 207.463 163.746 197.127 163.566 195.151C167.663 194.326 171.879 190.237 172.641 183.648C172.963 181.286 172.872 178.885 172.372 176.553C172.283 176.194 171.841 176.285 171.833 176.643C171.737 180.637 171.722 184.275 170.214 187.787C168.069 192.766 162.51 195.743 157.634 193.177C157.365 192.997 157.187 193.355 157.365 193.537C158.103 194.282 159.017 194.828 160.022 195.127C161.027 195.425 162.091 195.466 163.116 195.245C163.116 197.132 163.206 206.927 163.385 207.375C160.331 207.196 148.648 207.107 148.648 207.016C148.66 203.985 148.511 200.956 148.2 197.941C148.2 197.67 147.84 197.761 147.84 198.03C147.66 199.467 147.66 206.298 147.749 207.016C147.749 207.107 133.551 207.466 130.946 207.735C130.588 207.821 130.588 208.184 130.858 208.181Z"
        fill="#191919"
      />
      <path
        d="M162.758 219.683C162.723 219.719 162.704 219.767 162.705 219.817C162.706 219.867 162.726 219.915 162.761 219.95C162.796 219.986 162.844 220.006 162.894 220.006C162.944 220.007 162.992 219.988 163.028 219.953C164.286 218.694 165.522 217.506 166.713 216.178C170.114 212.214 173.095 207.907 175.608 203.328C176.268 202.086 176.867 200.812 177.496 199.555C177.75 207.472 179.266 215.299 181.989 222.739C182.178 223.184 182.891 222.828 182.797 222.379C182.365 220.308 181.551 218.331 181 216.274C179.407 210.319 178.532 204.195 178.393 198.032C183.178 198.594 203.12 197.548 205.712 197.312C206.25 197.223 206.341 196.415 205.712 196.415C202.897 196.415 194.553 197.223 184.056 197.223C182.168 197.223 180.192 197.223 178.215 197.403C178.17 197.346 178.11 197.302 178.043 197.275C177.976 197.247 177.903 197.238 177.83 197.247C177.758 197.255 177.69 197.283 177.631 197.326C177.573 197.369 177.526 197.426 177.496 197.492C174.52 203.759 170.842 209.668 166.533 215.106C165.291 216.645 164.129 218.267 162.758 219.683Z"
        fill="#191919"
      />
      <path
        d="M211.282 220.851C211.132 219.341 210.317 216.958 208.857 209.888C208.199 206.128 207.328 202.408 206.25 198.746C206.235 198.69 206.199 198.642 206.149 198.611C206.1 198.58 206.041 198.57 205.984 198.581C205.927 198.592 205.877 198.625 205.843 198.672C205.809 198.719 205.794 198.777 205.801 198.835C206.587 204.518 207.667 210.157 209.037 215.729C209.33 217.581 209.843 219.391 210.565 221.121C210.654 221.39 211.282 221.301 211.282 220.851Z"
        fill="#191919"
      />
      <path
        d="M174.888 209.715C174.888 209.535 174.619 209.446 174.53 209.715C173.784 214.052 173.334 218.435 173.182 222.834C170.755 222.385 168.232 221.936 165.813 221.486C165.633 221.486 165.544 221.666 165.723 221.757C168.598 222.474 180.28 225.261 183.246 225.882C183.353 225.915 183.469 225.906 183.569 225.855C183.67 225.805 183.747 225.718 183.785 225.613C191.21 225.448 206.733 223.616 209.575 223.096C210.112 222.997 209.934 222.106 209.485 222.197C207.149 222.288 204.811 222.719 202.476 223.006C193.192 224.147 188.407 224.359 183.785 225.162C183.554 224.931 184.549 225.198 174.171 223.006C174.24 221.43 174.86 210.061 174.888 209.715Z"
        fill="#191919"
      />
      <path
        d="M202.925 213.124C202.985 213.117 203.041 213.093 203.087 213.056C203.134 213.018 203.168 212.968 203.187 212.911C203.206 212.855 203.208 212.794 203.194 212.736C203.179 212.678 203.148 212.625 203.105 212.584C201.622 211.973 200.089 211.491 198.523 211.145C193.688 209.563 189.092 207.326 184.864 204.496C184.684 204.407 184.505 204.676 184.684 204.766C187.993 207.222 199.054 213.607 202.925 213.124Z"
        fill="#191919"
      />
      <path
        d="M193.939 213.033C192.742 212.663 191.572 212.212 190.435 211.685C190.166 211.596 189.895 211.956 190.166 212.045C191.827 212.89 193.575 213.554 195.378 214.025C195.973 214.281 196.617 214.404 197.264 214.384C197.317 214.382 197.367 214.362 197.407 214.328C197.447 214.294 197.474 214.247 197.485 214.195C197.495 214.144 197.488 214.09 197.465 214.043C197.441 213.996 197.402 213.958 197.355 213.936C196.247 213.528 195.104 213.226 193.939 213.033Z"
        fill="#191919"
      />
      <path
        d="M212.721 165.137C213.023 164.553 213.15 163.895 213.086 163.241C213.022 162.588 212.771 161.966 212.361 161.452C211.751 160.674 210.899 160.12 209.94 159.876C208.981 159.633 207.968 159.713 207.06 160.106C206.169 160.533 205.398 161.176 204.817 161.976C204.236 162.776 203.864 163.708 203.734 164.688C203.734 164.419 202.117 163.969 201.937 163.969C200.98 163.854 200.013 164.092 199.219 164.639C198.425 165.186 197.858 166.003 197.624 166.939C195.716 166.656 193.769 167.071 192.142 168.107C191.43 168.566 190.507 169.371 190.885 170.263C191.228 171.078 192.502 171.253 193.311 171.341C195.14 171.734 197.018 171.855 198.883 171.701C199.817 171.631 200.747 171.511 201.668 171.341C202.478 171.176 203.196 170.801 204.004 170.712C204.644 170.833 205.255 171.077 205.801 171.432C209.139 173.1 212.632 172.507 213.886 171.252C213.886 171.072 213.795 170.981 213.615 170.892C213.436 170.803 213.347 170.892 213.167 170.981C211.946 171.451 210.637 171.646 209.332 171.553C208.028 171.46 206.76 171.081 205.618 170.443C205.28 170.212 204.895 170.06 204.491 169.998C204.086 169.935 203.673 169.965 203.281 170.084C200.278 170.979 197.103 171.133 194.027 170.532C193.539 170.449 193.058 170.329 192.588 170.173C192.05 170.084 191.408 169.805 191.87 169.183C192.959 167.721 196.007 167.33 197.8 167.655C197.867 167.677 197.938 167.682 198.007 167.669C198.076 167.656 198.141 167.626 198.195 167.581C198.249 167.536 198.291 167.478 198.316 167.412C198.341 167.347 198.35 167.276 198.34 167.206C198.432 166.624 198.689 166.081 199.08 165.64C199.471 165.2 199.98 164.88 200.547 164.72C201.114 164.559 201.715 164.564 202.279 164.734C202.843 164.904 203.346 165.231 203.73 165.678C203.786 165.738 203.859 165.78 203.939 165.799C204.019 165.818 204.103 165.812 204.18 165.784C204.257 165.755 204.323 165.704 204.372 165.637C204.42 165.571 204.447 165.491 204.45 165.409C204.439 164.548 204.638 163.697 205.029 162.929C205.421 162.162 205.993 161.502 206.697 161.005C207.457 160.468 208.394 160.242 209.316 160.376C210.237 160.51 211.072 160.993 211.647 161.725C212.258 162.651 212.484 163.779 212.276 164.87C212.355 165.228 212.63 165.228 212.721 165.137Z"
        fill="#FF9900"
      />
      <path
        d="M199.781 186.704C199.769 186.704 199.757 186.706 199.746 186.711C199.735 186.715 199.725 186.721 199.717 186.73C199.709 186.738 199.702 186.748 199.698 186.759C199.693 186.77 199.691 186.782 199.691 186.793C198.477 187.436 197.094 187.688 195.731 187.513C191.037 187.199 191.093 185.845 188.184 186.884C184.967 188.039 183.663 186.948 182.343 187.153C181.467 187.288 180.626 188.28 178.928 188.052C178.21 187.957 177.58 187.424 176.948 187.424C176.139 187.333 176.588 188.141 176.948 188.414C177.695 188.82 178.536 189.025 179.386 189.009C180.237 188.993 181.069 188.757 181.8 188.323C182.017 188.18 182.263 188.088 182.52 188.054C183.417 187.963 184.317 188.414 185.214 188.414C188.452 188.414 188.884 186.874 191.775 187.785C194.169 188.517 196.717 188.578 199.144 187.963C201.289 187.447 201.577 185.902 199.683 184.818C196.383 183.168 195.184 185.148 194.471 183.29C194.234 182.831 193.89 182.436 193.468 182.139C193.045 181.842 192.557 181.652 192.045 181.584C191.019 181.495 189.985 181.586 188.99 181.853C189.096 180.855 188.964 179.846 188.604 178.909C188.245 177.971 187.668 177.132 186.922 176.461C184.129 174.161 180.652 176.334 181.261 176.641C181.352 176.732 181.532 176.641 181.621 176.641C182.395 176.229 183.278 176.068 184.148 176.181C185.017 176.294 185.83 176.675 186.473 177.271C187.084 177.892 187.547 178.642 187.827 179.467C188.107 180.291 188.197 181.169 188.09 182.033C188.09 182.393 188.001 182.842 188.361 183.023C188.81 183.292 189.438 182.843 189.887 182.754C190.492 182.539 191.134 182.447 191.775 182.483C192.23 182.51 192.673 182.646 193.064 182.881C193.456 183.116 193.784 183.442 194.022 183.832C194.187 184.195 194.202 184.551 194.471 184.731C194.831 185.09 195.461 184.919 195.999 184.82C198.34 184.391 200.401 185.769 200.401 186.348C200.206 186.486 199.998 186.605 199.781 186.704Z"
        fill="#FF9900"
      />
      <path
        d="M147.751 230.556C147.787 230.535 147.815 230.503 147.832 230.464C147.848 230.426 147.851 230.383 147.841 230.343C147.831 230.302 147.808 230.266 147.776 230.24C147.744 230.213 147.704 230.198 147.662 230.196C145.517 230.694 143.414 231.356 141.37 232.176C140.922 232.536 142.09 235.052 142.27 235.321C142.984 236.214 143.987 235.227 149.908 232.267C149.998 232.216 150.065 232.133 150.096 232.034C150.126 231.935 150.117 231.828 150.071 231.736C150.025 231.643 149.944 231.572 149.847 231.537C149.75 231.502 149.643 231.506 149.548 231.548C148.201 232.176 143.349 234.693 143.169 234.693C142.989 234.693 141.91 232.896 142.09 232.713C142.181 232.533 147.122 230.736 147.751 230.556Z"
        fill="#191919"
      />
      <path
        d="M153.862 236.94C154.04 236.94 156.377 236.4 156.557 236.311C157.007 236.041 156.737 235.501 156.468 235.143C156.199 234.785 153.592 231.908 153.412 231.817C153.349 231.781 153.276 231.768 153.205 231.778C153.133 231.787 153.067 231.82 153.016 231.872C152.965 231.923 152.933 231.989 152.923 232.06C152.913 232.132 152.927 232.205 152.963 232.267C153.888 233.432 154.88 234.542 155.933 235.592C155.933 235.592 154.136 236.041 154.045 236.041C154.045 236.041 151.8 233.165 151.075 232.176C150.986 231.997 150.716 232.176 150.806 232.356C151.522 234.066 152.559 235.622 153.862 236.94Z"
        fill="#191919"
      />
      <path
        d="M158.175 232.893C157.996 233.432 158.893 233.701 159.073 233.162C159.34 232.383 159.432 231.555 159.344 230.736C159.344 230.556 159.253 230.287 158.984 230.287C157.001 229.863 154.988 229.593 152.963 229.477C152.694 229.477 152.694 229.837 152.874 229.928C154.699 230.454 156.561 230.845 158.444 231.096C158.45 231.705 158.359 232.311 158.175 232.893Z"
        fill="#191919"
      />
      <path
        d="M155.839 227.5C156.126 227.153 156.338 226.75 156.461 226.317C156.585 225.884 156.617 225.43 156.557 224.984C156.436 223.459 155.209 221.93 155.748 220.402C155.839 220.042 155.748 219.953 155.479 220.133C155.323 220.268 155.195 220.433 155.102 220.618C155.009 220.803 154.954 221.004 154.94 221.21C154.698 222.194 154.304 223.134 153.772 223.996C153.544 221.363 152.472 218.875 150.716 216.901C150.35 216.549 149.907 216.721 150.178 217.17C150.756 218.218 150.997 219.418 150.868 220.608C150.739 221.798 150.247 222.919 149.459 223.819C149.369 222.829 149.19 221.839 149.099 220.849C149.099 220.58 148.83 220.489 148.739 220.94C148.081 222.575 146.956 223.981 145.505 224.982C145.039 225.405 144.732 225.974 144.633 226.595C144.535 227.216 144.652 227.852 144.966 228.398C146.894 231.028 153.734 229.873 155.839 227.5Z"
        fill="#FF9900"
      />
      <path
        d="M172.552 90.0139C171.832 86.0802 169.955 82.4506 167.161 79.5892C164.647 77.3419 160.512 76.4443 157.725 78.8714C154.021 80.236 153.27 83.3429 153.052 87.3178C153.052 91.9906 154.795 96.9488 152.694 101.425C151.606 103.428 150.374 105.351 149.01 107.177C144.665 113.766 147.092 116.779 146.134 122.184C145.144 127.743 142.256 132.3 144.154 138.448C144.771 140.984 146.189 143.253 148.198 144.919C148.465 145.101 148.916 144.739 148.736 144.38C147.363 142.416 146.343 141.939 145.231 138.539C143.307 132.647 145.662 128.527 146.759 123.621C148.191 117.221 145.781 113.906 149.006 108.614C151.448 104.606 154.577 102.199 154.577 96.2146C154.577 91.555 151.671 81.7111 157.812 79.1404C161.51 77.0119 166.968 78.6916 169.584 84.8015C170.28 86.4284 170.663 88.0372 171.202 89.6542C170.52 89.8283 169.857 90.0692 169.222 90.3736C168.32 90.606 167.378 90.6378 166.462 90.4667C165.546 90.2957 164.678 89.926 163.921 89.3836C161.919 87.8579 160.544 85.6523 160.056 83.1829C160.056 83.003 159.698 83.003 159.698 83.1829C159.784 84.5749 160.186 85.9291 160.872 87.1433C161.558 88.3576 162.51 89.4001 163.658 90.1921C164.474 90.721 165.387 91.0812 166.343 91.2512C167.3 91.4212 168.281 91.3977 169.229 91.1821C169.258 91.2472 169.302 91.3049 169.356 91.3507C169.411 91.3965 169.476 91.4293 169.545 91.4466C169.614 91.4639 169.686 91.4653 169.756 91.4506C169.826 91.436 169.892 91.4056 169.948 91.3619C171.686 89.8769 173.436 91.4972 173.004 93.8782C172.733 94.8682 171.656 96.1238 170.577 95.3153C170.494 95.2516 170.395 95.2099 170.292 95.194C170.188 95.1781 170.082 95.1885 169.983 95.2243C169.885 95.2602 169.797 95.3202 169.728 95.399C169.658 95.4777 169.61 95.5727 169.587 95.675C169.651 96.722 169.466 97.7693 169.047 98.7308C168.676 99.4349 168.158 100.051 167.527 100.536C166.896 101.022 166.168 101.366 165.393 101.545C164.617 101.724 163.812 101.734 163.033 101.574C162.253 101.413 161.517 101.087 160.875 100.617C159.314 99.1866 158.245 97.3 157.819 95.2262C156.514 91.1012 156.511 86.7634 159.707 83.9039C159.885 83.8132 159.616 83.5442 159.527 83.7241C155.865 86.8063 155.567 90.8191 156.831 95.4061C157.252 97.7461 158.418 99.8874 160.155 101.511C161.268 102.374 162.627 102.857 164.035 102.889C165.442 102.922 166.822 102.502 167.973 101.691C168.062 102.32 169.051 105.816 169.051 105.816C169.343 105.602 169.614 105.361 169.861 105.097C169.429 103.809 168.919 102.548 168.333 101.323C168.905 100.839 169.391 100.262 169.77 99.6152C170.101 99.0571 170.344 98.4509 170.489 97.8184C170.839 99.5775 171.382 101.293 172.106 102.933C172.377 102.664 172.555 102.394 172.826 102.125C171.994 100.365 171.331 98.5293 170.846 96.6436C174.935 97.0346 175.2 91.2349 172.552 90.0139Z"
        fill="#191919"
      />
      <path
        d="M159.885 93.3388C160.819 93.3388 161.149 92.72 160.875 92.1706C160.497 91.7661 159.987 91.5108 159.436 91.4512C158.925 91.4512 158.398 91.763 158.539 92.6194C158.626 93.1804 159.433 93.3388 159.885 93.3388Z"
        fill="#191919"
      />
      <path
        d="M161.05 89.9252C160.6 89.0243 159.235 89.0045 158.265 89.2966C158.224 89.3182 158.19 89.3505 158.166 89.3901C158.142 89.4296 158.13 89.4748 158.13 89.521C158.13 89.5671 158.142 89.6123 158.166 89.6519C158.19 89.6914 158.224 89.7237 158.265 89.7454C158.893 89.8599 159.499 90.0726 160.062 90.3757C160.421 90.4631 161.321 90.643 161.05 89.9252Z"
        fill="#191919"
      />
      <path
        d="M162.758 97.472C163.208 97.7426 163.926 97.8316 164.106 97.2921C164.285 96.9324 163.657 96.8433 163.386 96.7526C162.848 96.4836 162.84 95.9473 162.668 95.4061C162.409 94.5199 162.199 93.6198 162.04 92.71C162.04 92.5302 161.769 92.6193 161.68 92.71C161.579 93.855 161.67 95.0089 161.949 96.1239C162.087 96.6402 162.367 97.1073 162.758 97.472Z"
        fill="#191919"
      />
      <path
        d="M165.903 98.551C165.605 98.734 165.262 98.8274 164.913 98.8199C164.733 98.8199 163.835 98.7308 164.284 99.1796C164.551 99.386 164.864 99.5236 165.196 99.5801C165.529 99.6366 165.87 99.6104 166.19 99.5037C166.51 99.397 166.798 99.2132 167.03 98.9685C167.262 98.7238 167.43 98.4257 167.52 98.1005C167.638 97.7847 167.669 97.4425 167.609 97.1105C167.582 96.9862 167.514 96.8744 167.416 96.7931C167.318 96.7118 167.196 96.6655 167.069 96.6617C166.094 96.5 166.561 98.1121 165.903 98.551Z"
        fill="#191919"
      />
      <path
        d="M161.23 81.0281C162.41 81.4519 163.484 82.1275 164.376 83.0081C165.297 83.0081 163.807 80.7608 161.321 80.7608C161.05 80.7575 161.05 81.0281 161.23 81.0281Z"
        fill="#191919"
      />
      <path
        d="M162.489 80.04C162.758 80.1291 163.117 80.3997 163.386 80.3997C163.926 80.3997 163.286 79.5005 161.406 79.5005C161.36 79.5036 161.316 79.5235 161.283 79.5566C161.25 79.5897 161.23 79.6337 161.227 79.6803C161.23 79.9905 161.562 79.7298 162.489 80.04Z"
        fill="#191919"
      />
      <path
        d="M157.905 81.8402C157.388 82.3104 156.987 82.8953 156.737 83.5479C156.731 83.5967 156.736 83.6461 156.752 83.6927C156.767 83.7392 156.793 83.7816 156.827 83.8169C156.917 83.9076 157.007 83.8169 157.096 83.7278C157.187 83.5479 157.367 83.3681 157.456 83.1882C157.865 82.6951 158.351 82.2702 158.893 81.9293C159.25 81.6554 158.893 81.3006 158.535 81.4805C158.317 81.5849 158.106 81.7051 157.905 81.8402Z"
        fill="#191919"
      />
      <path
        d="M156.648 81.1172C156.624 81.1408 156.605 81.1688 156.593 81.1997C156.58 81.2306 156.573 81.2636 156.573 81.297C156.573 81.3304 156.58 81.3635 156.593 81.3944C156.605 81.4252 156.624 81.4533 156.648 81.4769C156.671 81.5005 156.699 81.5192 156.73 81.532C156.761 81.5448 156.794 81.5514 156.828 81.5514C156.861 81.5514 156.894 81.5448 156.925 81.532C156.956 81.5192 156.984 81.5005 157.007 81.4769C157.197 81.2754 157.408 81.0946 157.636 80.9373C157.816 80.8482 158.085 80.8482 158.176 80.6684C158.265 80.5776 158.176 80.4885 158.085 80.3994C157.633 80.3994 157.476 80.2889 156.648 81.1172Z"
        fill="#191919"
      />
      <path
        d="M161.501 82.6454C161.41 82.5563 161.232 82.7345 161.321 82.8252C163.416 84.995 165.371 89.8427 168.959 89.6546C169.054 89.6468 169.145 89.6059 169.214 89.5389C169.283 89.4718 169.326 89.3828 169.337 89.2871C169.348 89.1914 169.324 89.0951 169.272 89.0146C169.219 88.9341 169.14 88.8745 169.048 88.8461C164.769 87.9452 164.596 85.122 161.501 82.6454Z"
        fill="#191919"
      />
      <path
        d="M167.341 106.998C167.162 106.818 167.162 106.189 166.891 106.189C166.262 106.189 166.622 107.446 166.713 107.717C166.804 107.988 168.239 110.591 168.419 110.413C162.998 114.239 158.588 119.326 155.569 125.235C152.637 131.673 151.67 138.833 152.79 145.817C153.503 149.952 156.112 158.661 156.475 158.488C158.435 157.554 216.865 132.158 216.865 131.979C216.236 130.182 208.148 108.077 208.148 107.986C207.841 107.268 206.737 106.76 204.554 105.201C200.22 102.66 195.271 101.358 190.247 101.437C185.224 101.516 180.319 102.974 176.067 105.65C175.349 103.044 175.709 100.797 174.809 101.157C174.45 101.247 174.276 101.79 174.09 102.056C172.344 104.526 168.15 107.806 167.341 106.998Z"
        fill="#FF9900"
      />
      <path
        d="M157.816 101.425C157.725 101.247 157.456 101.247 157.456 101.516C157.816 104.572 155.909 107.162 154.311 109.423C152.44 112.074 151.28 113.795 151.076 117.062C150.876 120.258 151.823 122.507 150.807 125.958C149.708 129.693 146.809 134.579 151.435 139.983C151.346 139.447 151.346 138.901 151.435 138.366C150.496 136.983 149.966 135.363 149.907 133.693C149.764 130.909 151.239 128.475 151.975 125.875C152.765 123.083 152.199 120.214 152.244 117.338C152.293 114.17 153.282 112.469 155.3 109.609C156.897 107.342 158.535 104.481 157.816 101.425Z"
        fill="#191919"
      />
      <path
        d="M156.557 116.16C156.392 117.241 156.377 118.945 157.277 119.665C157.341 119.697 157.412 119.714 157.484 119.712C157.556 119.71 157.626 119.691 157.688 119.655C157.751 119.619 157.803 119.569 157.841 119.508C157.879 119.446 157.901 119.377 157.905 119.305C157.905 118.676 157.545 118.048 157.545 117.417C157.545 111.964 163.736 109.115 162.398 104.658C162.309 104.478 162.04 104.569 162.129 104.747C162.789 108.488 157.311 111.137 156.557 116.16Z"
        fill="#191919"
      />
      <path
        d="M281.195 179.426C280.026 178.665 277.69 179.966 277.69 181.043C277.69 182.571 281.104 181.403 281.554 180.683C281.657 180.466 281.678 180.218 281.612 179.987C281.545 179.755 281.397 179.556 281.195 179.426Z"
        fill="#191919"
      />
      <path
        d="M274.814 179.695C274.813 179.653 274.797 179.613 274.771 179.581C274.745 179.548 274.708 179.525 274.668 179.515C274.627 179.505 274.585 179.509 274.546 179.525C274.508 179.541 274.476 179.57 274.455 179.606C273.658 183.401 272.749 185.537 273.465 186.793C273.735 187.333 274.364 187.872 274.993 187.603C275.172 187.512 275.263 187.244 275.083 187.153C274.724 186.704 274.273 186.524 274.184 185.895C273.989 184.526 274.606 183.038 274.814 179.695Z"
        fill="#191919"
      />
      <path
        d="M280.027 189.669C280.296 189.489 280.746 189.22 280.746 188.861C280.754 188.78 280.742 188.698 280.712 188.622C280.681 188.547 280.633 188.48 280.571 188.427C280.509 188.374 280.436 188.337 280.356 188.318C280.277 188.3 280.195 188.301 280.116 188.321C279.728 188.321 278.877 189.049 277.959 189.311C277.59 189.447 277.194 189.493 276.804 189.447C276.414 189.4 276.04 189.261 275.713 189.042C275.443 188.773 274.994 189.131 275.263 189.402C275.87 191.22 278.603 190.89 280.027 189.669Z"
        fill="#191919"
      />
      <path
        d="M281.82 176.011C281.425 175.09 277.675 175.196 276.518 177.179C276.339 177.449 276.611 177.814 276.878 177.718C278.006 177.173 279.224 176.838 280.472 176.728C280.83 176.639 282.183 176.73 281.82 176.011Z"
        fill="#191919"
      />
      <path
        d="M264.66 180.323C264.84 181.851 264.969 183.373 265.2 184.907C265.452 185.936 265.573 186.993 265.559 188.052C265.469 188.412 265.38 188.681 265.559 188.951C265.79 189.412 266.917 189.108 266.637 187.423C266.221 184.993 265.65 182.592 264.929 180.234C264.857 179.993 264.66 180.054 264.66 180.323Z"
        fill="#191919"
      />
      <path
        d="M262.863 191.377C262.492 191.376 262.132 191.253 261.839 191.025C261.547 190.797 261.338 190.479 261.246 190.12C261.217 190.053 261.168 189.998 261.105 189.963C261.041 189.927 260.968 189.914 260.897 189.924C260.825 189.934 260.759 189.967 260.708 190.019C260.657 190.07 260.625 190.137 260.616 190.209C260.634 190.74 260.83 191.25 261.172 191.658C261.514 192.065 261.983 192.346 262.503 192.456C263.378 192.674 265.282 192.479 265.559 191.646C265.739 191.377 265.828 190.928 265.379 191.017H265.02C264.33 191.274 263.598 191.396 262.863 191.377Z"
        fill="#191919"
      />
      <path
        d="M257.922 178.706C257.616 179.01 258.055 179.403 258.37 179.246C258.929 178.915 259.535 178.672 260.167 178.527C260.616 178.438 261.863 178.611 262.147 178.167C262.665 177.344 259.581 176.715 257.922 178.706Z"
        fill="#191919"
      />
      <path
        d="M268.255 177.358C267.458 176.561 265.15 177.791 266.275 178.167C266.973 178.351 267.715 178.254 268.343 177.898C268.524 177.718 268.433 177.54 268.255 177.358Z"
        fill="#191919"
      />
      <path
        d="M265.289 167.744C264.849 169.23 264.01 170.566 262.863 171.608C260.499 173.634 256.633 174.116 255.045 176.639C254.663 177.215 254.408 177.867 254.3 178.551C254.192 179.234 254.231 179.933 254.417 180.599C255.151 182.682 255.575 184.862 255.674 187.069C254.857 186.656 253.925 186.529 253.028 186.708C252.13 186.888 251.319 187.363 250.724 188.059C250.467 188.437 250.308 188.873 250.261 189.327C250.214 189.782 250.28 190.241 250.453 190.664C252.653 193.84 257.456 191.964 255.755 191.115C255.541 191.1 255.327 191.131 255.126 191.204C254.136 191.383 251.551 191.025 251.712 189.407C251.917 187.343 255.755 187.61 255.755 187.339V187.519C255.755 187.699 255.935 187.79 256.115 187.699C257.08 187.056 255.879 181.843 255.846 181.678C255.037 177.613 255.913 176.474 259.53 174.849C262.046 173.719 264.236 172.587 265.46 170.267C265.924 169.549 266.086 168.676 265.911 167.84C265.65 167.653 265.379 167.564 265.289 167.744Z"
        fill="#191919"
      />
      <path
        d="M268.884 168.552C268.805 168.62 268.741 168.702 268.694 168.795C268.648 168.887 268.62 168.988 268.613 169.092C268.176 170.448 267.343 171.642 266.223 172.523C265.102 173.403 263.745 173.929 262.324 174.034C262.055 174.034 262.144 174.393 262.414 174.393C263.312 174.498 264.22 174.467 265.109 174.303C266.243 173.958 267.265 173.317 268.07 172.448C268.876 171.578 269.436 170.51 269.693 169.353C269.693 169.092 269.513 168.103 268.884 168.552Z"
        fill="#191919"
      />
      <path
        d="M270.765 172.425C269.831 173.618 268.485 174.419 266.992 174.67C266.723 174.67 266.812 175.121 267.082 175.121C267.946 175.199 268.814 175.044 269.597 174.67C270.608 174.143 271.449 173.34 272.022 172.354C272.595 171.368 272.876 170.24 272.833 169.1C272.855 168.87 272.827 168.638 272.749 168.42C272.672 168.203 272.547 168.005 272.384 167.841C272.294 167.808 272.197 167.799 272.102 167.815C272.007 167.831 271.918 167.871 271.844 167.932C271.475 168.673 272.351 170.639 270.765 172.425Z"
        fill="#191919"
      />
      <path
        d="M257.202 171.435C254.605 172.27 251.325 173.58 250.282 176.385C249.852 177.789 249.751 179.272 249.984 180.721C250.218 182.169 250.781 183.545 251.63 184.742C251.667 184.795 251.719 184.834 251.78 184.853C251.841 184.873 251.906 184.873 251.967 184.853C252.027 184.833 252.079 184.794 252.116 184.741C252.153 184.689 252.171 184.626 252.169 184.563C251.901 183.215 251.27 181.957 250.912 180.698C250.484 179.451 250.521 178.092 251.016 176.87C251.511 175.648 252.431 174.646 253.607 174.049C254.775 173.329 256.034 172.612 257.291 171.981C257.651 171.787 257.473 171.341 257.202 171.435Z"
        fill="#191919"
      />
      <path
        d="M253.787 202.879C255.224 200.724 255.272 195.849 255.135 193.265C255.138 193.222 255.132 193.178 255.118 193.137C255.103 193.096 255.08 193.059 255.051 193.027C255.021 192.996 254.986 192.97 254.946 192.953C254.906 192.936 254.864 192.927 254.82 192.927C254.777 192.927 254.734 192.936 254.694 192.953C254.655 192.97 254.619 192.996 254.589 193.027C254.56 193.059 254.537 193.096 254.523 193.137C254.509 193.178 254.503 193.222 254.506 193.265C254.417 194.882 254.146 196.499 253.966 198.027C253.559 199.557 253.289 201.121 253.158 202.699C253.069 203.059 253.605 203.239 253.787 202.879Z"
        fill="#191919"
      />
      <path
        d="M258.19 201.442C258.19 201.8 258.369 202.333 258.819 202.25C259.357 202.151 259.359 201.442 259.448 200.991C259.745 199.78 259.956 198.548 260.078 197.307C260.078 197.127 259.718 196.949 259.628 197.127C258.856 198.451 258.366 199.92 258.19 201.442Z"
        fill="#191919"
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
};
