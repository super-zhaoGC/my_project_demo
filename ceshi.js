 const data = [{
     id: 3,
     name: '节点C',
     parentId: 1
   },
   {
     id: 6,
     name: '节点F',
     parentId: 3
   },
   {
     id: 0,
     name: 'root',
     parentId: null
   },
   {
     id: 1,
     name: '节点A',
     parentId: 0
   },
   {
     id: 8,
     name: '节点H',
     parentId: 4
   },
   {
     id: 4,
     name: '节点D',
     parentId: 1
   },
   {
     id: 2,
     name: '节点B',
     parentId: 0
   },
   {
     id: 5,
     name: '节点E',
     parentId: 2
   },
   {
     id: 7,
     name: '节点G',
     parentId: 2
   },
   {
     id: 9,
     name: '节点I',
     parentId: 5
   }
 ];

 function convert(data) {
   let result;
   let map = {};
   data.forEach(item => {
     map[item.id] = item;
   });
   console.log(map);
console.log(data)
   data.forEach(item => {
     // item.pid 为null时 返回underfined
     let parent = map[item.parentId];
console.log(parent);
     if (parent) {
       (parent.children || (parent.children = [])).push(item);
     } else {
       // 这里push的item是pid为null的数据
       result = item;
     }
   });
   console.log(result)
   return result;
 }
 convert(data)