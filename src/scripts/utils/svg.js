export const loading = `
  <svg width="40" height="10" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#93E1D8" style="vertical-align:middle;">
    <circle cx="15" cy="15" r="15">
        <animate attributeName="r" from="15" to="15"
                 begin="0s" dur="0.8s"
                 values="15;9;15" calcMode="linear"
                 repeatCount="indefinite" />
        <animate attributeName="fill-opacity" from="1" to="1"
                 begin="0s" dur="0.8s"
                 values="1;.5;1" calcMode="linear"
                 repeatCount="indefinite" />
    </circle>
    <circle cx="60" cy="15" r="9" fill-opacity="0.3">
        <animate attributeName="r" from="9" to="9"
                 begin="0s" dur="0.8s"
                 values="9;15;9" calcMode="linear"
                 repeatCount="indefinite" />
        <animate attributeName="fill-opacity" from="0.5" to="0.5"
                 begin="0s" dur="0.8s"
                 values=".5;1;.5" calcMode="linear"
                 repeatCount="indefinite" />
    </circle>
    <circle cx="105" cy="15" r="15">
        <animate attributeName="r" from="15" to="15"
                 begin="0s" dur="0.8s"
                 values="15;9;15" calcMode="linear"
                 repeatCount="indefinite" />
        <animate attributeName="fill-opacity" from="1" to="1"
                 begin="0s" dur="0.8s"
                 values="1;.5;1" calcMode="linear"
                 repeatCount="indefinite" />
    </circle>
</svg>
`;

export const arrow = '<svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" fill="#909090" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>';