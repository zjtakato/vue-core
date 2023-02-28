import Vue from 'Vue';

let vm = new Vue({
  data: function () {
    return {
      name: 'xx',
      age: 18,
      info: {
        address: 'china',
      },
    };
  },
});

vm.$watch('name', () => {
  console.log('name 被修改了');
})
vm.name = 'xxx';
