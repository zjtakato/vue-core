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
vm.name;
vm.name = 'xxx';
vm.$set(vm.info, 'xx', 'xx');
vm.info.xx;
