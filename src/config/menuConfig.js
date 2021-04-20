const menuList = [
{
title: 'Home', // Menu name
key: '/home', // Link path
icon: 'home', // icon
},
{
title: 'Product',
key: '/products',
icon: 'appstore',
children: [ // Children meun list
{
title: 'Category',
key: '/category',
icon: 'bars'
},
{
title: 'Product',
key: '/product',
icon: 'tool'
},
]
},
{
title: 'User',
key: '/user',
icon: 'user'
},
{
title: 'Role',
key: '/role',
icon: 'safety',
},
{
title: 'Area Chart',
key: '/charts',
icon: 'area-chart',
children: [
{
title: 'Bar Chart',
key: '/charts/bar',
icon: 'bar-chart'
},
{
title: 'Line Chart',
key: '/charts/line',
icon: 'line-chart'
},
{
title: 'Pie Chart',
key: '/charts/pie',
icon: 'pie-chart'
},
]
},
]
export default menuList