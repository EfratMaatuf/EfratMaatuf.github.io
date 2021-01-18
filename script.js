
  var slider = tns({
    container: '.my-slider',
    autoplay:true,
    speed:10000,
    items: 1,
    responsive: {
      640: {
        edgePadding: 20,
        gutter: 20,
        items: 2
      },
      700: {
        gutter: 30
      },
      900: {
        items: 3
      }
    }
  });