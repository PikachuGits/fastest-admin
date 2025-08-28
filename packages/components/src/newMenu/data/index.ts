// export default [
//   {
//     id: 1,
//     subheader: "用户",
//     items: [
//       {
//         id: 3,
//         title: "Landing",
//         path: "#landing",
//         icon: "solar:home-angle-bold-duotone",
//         info: ["info.landing", "+1"],
//         roles: ["admin"],
//         caption:
//           "Display only admin roleDisplay only admin roleDisplay only admin roleDisplay only admin role",
//       },
//       {
//         id: 4,
//         title: "Services",
//         path: "#services",
//         icon: "solar:home-angle-bold-duotone",
//         roles: ["admin", "user"],
//       },
//       {
//         id: 5,
//         title: "Blog",
//         path: "#blog",
//         icon: "solar:home-angle-bold-duotone",
//         info: ["info.blog", "+2"],
//         children: [
//           {
//             id: 17,
//             title: "Item 1",
//             path: "#blog/item-1",
//             caption: "Display caption",
//             info: ["info.blog.item1", "+3"],
//           },
//           {
//             id: 18,
//             title: "Item 2",
//             path: "#blog/item-2",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     subheader: "系统管理",
//     items: [
//       {
//         id: 6,
//         title: "About",
//         path: "#about",
//         icon: "solar:gallery-circle-outline",
//       },
//       {
//         id: 7,
//         title: "Contact",
//         path: "#contact",
//         icon: "solar:gallery-circle-outline",
//       },
//       {
//         id: 8,
//         title: "Level",
//         path: "#level",
//         icon: "solar:gallery-circle-outline",
//         children: [
//           {
//             id: 9,
//             title: "Level 2a",
//             path: "#level/2a",
//             icon: "solar:gallery-circle-outline",
//             caption: "This is the caption",
//             children: [
//               {
//                 id: 10,
//                 title: "Level 3a",
//                 path: "#level/2a/3a",
//               },
//               {
//                 id: 11,
//                 title: "Level 3b",
//                 path: "#level/2a/3b",
//                 children: [
//                   {
//                     id: 12,
//                     title: "Level 4a",
//                     path: "#level/2a/3b/4a",
//                   },
//                   {
//                     id: 13,
//                     title: "Level 4b",
//                     path: "#level/2a/3b/4b",
//                   },
//                 ],
//               },
//               {
//                 id: 14,
//                 title: "Level 3c",
//                 path: "#level/2a/3c",
//               },
//             ],
//           },
//           {
//             id: 15,
//             title: "Level 2b",
//             path: "#level/2b",
//             icon: "solar:gallery-circle-outline",
//           },
//           {
//             id: 16,
//             title: "Level 2c",
//             path: "#level/2c",
//             icon: "solar:gallery-circle-outline",
//           },
//         ],
//       },
//     ],
//   },
// ];

export default [
  {
    id: 1,
    subheader: "用户管理",
    icon: "solar:home-angle-bold-duotone",
    items: [
      {
        id: 11,
        title: "用户列表",
        icon: "solar:user-id-bold-duotone",
        children: [
          { id: 111, title: "Profile", path: "/user/profile" },
          { id: 112, title: "Cards", path: "/user/cards" },
          { id: 113, title: "List", path: "/user/list" },
          { id: 114, title: "Create", path: "/user/create" },
          { id: 115, title: "Edit", path: "/user/edit" },
          { id: 116, title: "Account", path: "/user/account" },
        ],
      },
      {
        id: 12,
        title: "用户组列表",
        path: "/user/groups",
        icon: "solar:users-group-two-rounded-bold-duotone",
      },
    ],
  },
  {
    id: 2,
    icon: "solar:buildings-2-bold-duotone",
    subheader: "公司管理",
    items: [
      {
        id: 21,
        title: "公司列表",
        path: "/company/list",
        icon: "solar:buildings-2-bold-duotone",
      },
    ],
  },
  {
    id: 3,
    icon: "solar:shield-keyhole-bold-duotone",
    subheader: "权限管理",
    items: [
      {
        id: 31,
        title: "角色管理",
        path: "/auth/roles",
        icon: "solar:shield-keyhole-bold-duotone",
      },
      {
        id: 32,
        title: "用户授权管理",
        path: "/auth/user",
        icon: "solar:user-check-bold-duotone",
      },
      {
        id: 33,
        title: "公司授权管理",
        path: "/auth/company",
        icon: "solar:buildings-bold-duotone",
      },
    ],
  },
  {
    id: 4,
    icon: "solar:settings-bold-duotone",
    subheader: "系统管理",
    items: [
      {
        id: 41,
        title: "任务模板",
        path: "/system/task-template",
        icon: "solar:clipboard-list-bold-duotone",
      },
      {
        id: 42,
        title: "任务方法",
        path: "/system/task-method",
        icon: "solar:checklist-bold-duotone",
      },
      {
        id: 43,
        title: "流程管理",
        path: "/system/process",
        icon: "solar:workflow-bold-duotone",
      },
      {
        id: 44,
        title: "系统配置",
        path: "/system/config",
        icon: "solar:settings-bold-duotone",
      },
      {
        id: 45,
        title: "字典配置",
        path: "/system/dictionary",
        icon: "solar:book-2-bold-duotone",
      },
      {
        id: 46,
        title: "菜单管理",
        path: "/system/menu",
        icon: "solar:menu-dots-circle-bold-duotone",
      },
    ],
  },
  {
    id: 5,
    subheader: "文件管理",
    icon: "solar:folder-with-files-bold-duotone",
    items: [
      {
        id: 51,
        title: "文件库管理",
        path: "/file/library",
        icon: "solar:folder-with-files-bold-duotone",
      },
      {
        id: 52,
        title: "文件管理",
        path: "/file/list",
        icon: "solar:documents-bold-duotone",
      },
    ],
  },
];
