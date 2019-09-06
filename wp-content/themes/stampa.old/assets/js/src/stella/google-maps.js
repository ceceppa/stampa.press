(() => {
  const mapEl = document.querySelectorAll('.gmap');
  if (mapEl === null) {
    return;
  }

  function showResult(mapElement, lat, lng) {
    const myLatLng = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };
    const map = new google.maps.Map(mapElement, {
      center: myLatLng,
      zoom: 15,
      rotateControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
    });
    // eslint-disable-next-line
    new google.maps.Marker({
      map,
      position: myLatLng,
    });
    const ww = window.innerWidth;
    const pinPosition = window.innerWidth >= 1050 ? -(ww / 4) : 0;
    map.panBy(pinPosition, 0);
  }

  function getLatitudeLongitude(map, address, callback) {
    const geocoder = new google.maps.Geocoder();
    if (geocoder) {
      geocoder.geocode({
        address,
      }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();

          callback(map, lat, lng);
        }
      });
    }
  }

  /**
   * If we don't have lat/lng need to get them by resolving the address using geocode API.
  */
  mapEl.forEach(map => {
    const lat = map.getAttribute('data-lat');

    if (lat) {
      showResult(map, lat, map.getAttribute('data-lng'));
    } else {
      const mapAddress = map.getAttribute('data-address');

      getLatitudeLongitude(map, mapAddress, showResult);
    }
  });
})();
