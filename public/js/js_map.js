jQuery.noConflict();
jQuery(document).ready(function($) {
  var markers = [];


  // map
  var map;

  // marcadores / lojas e pontos de distribuição no mapa
  var markers = [];

  // cluster var para agrupar marcadores próximos em zoom pequeno
  var mc;

  // bounds / função limites do mapa
  var bounds = new google.maps.LatLngBounds();

  // JSON file with data markers
  var mapJsonFile = 'https://cdn.rawgit.com/rhcarlosweb/google-maps-markers/7facb603/stores.json';

  /**
   * Função inicializar mapa
   */
  function initMap() {

    var myLatlng = new google.maps.LatLng(-14.0865322, -54.505771);

    // opções mapa inicial
    var mapOptions = {
      zoom: 6, // zoom inicial mapa
      maxZoom: 19, // zoom máximo
      center: new google.maps.LatLng(26.099531, 46.366767), // localização inicial
      mapTypeId: google.maps.MapTypeId.ROADMAP, // tipo de mapa
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_CENTER
      },
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
      },
      scaleControl: true,
      streetViewControl: true,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
      },
      fullscreenControl: true

    };

    // registra mapa na div #mapa como variável mapgoogle
    map = new google.maps.Map(document.getElementById("mapgoogle"), mapOptions);

    // Extrai informações do locais.json para criar marcadores
    $.getJSON(mapJsonFile, function(stores, textStatus) {
      // loop para criar marcadores no mapa usando
      // função addMarker()
      // para cada array em stores tem informações de um store
      $.each(stores, function(i, store) {
        // addMarker(store);
      });

      // cluster config
      // ajustes para exibição de ícone com marcadores agrupados
      var optionsCluster = {
        maxZoom: 13, // máximo zoom exibido cluster
        styles: [{
          textColor: '#ffffff', // cor texto cluster
          url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png', // imagem fundo do cluster
          width: 53, // largura da imagem
          height: 52 // altura da imagem
        }]
      };

      // suporte a clusters adicionado ao map
      // map = variável do mapa
      // markers = array de marcadores
      // optionsCluster = options do cluster configurados acima
      mc = new MarkerClusterer(map, markers, optionsCluster);

      // zoom para todos marcadores visíveis no ínicio
      // if (bounds.f.b != 1 && bounds.f.f != -1) {
      //     // map.fitBounds(bounds);
      // }
    });
  }

  /**
   * Função para registro de marcadores
   */
  function addMarker(markerinfo) {
    // titulo do marcador
    var is_open = false;
    var title = markerinfo.name;
    if (title === null) {
      title = '';
    }

    // endereco completo do marcador, deixa em branco se não há
    var address = markerinfo.location.full_address;
    if (address === null) {
      address = '';
    }

    // telefone do marcador, deixar em branco se não há
    var phone = markerinfo.phone;
    if (phone === null) {
      phone = '';
    }

    // pais do marcador
    var country = markerinfo.location.country.slug;

    // estado do marcador
    var state = markerinfo.location.state.slug;

    // cidade do marcador
    var city = markerinfo.location.city.slug;

    // setor do marcador
    var district = markerinfo.location.district.slug;

    // tipo do marcador
    var type = markerinfo.type.slug;

    // todas categorias em um array
    var categories = [
      country,
      state,
      city,
      district,
      type
    ];

    // posição lat e lng do marcador
    var position = new google.maps.LatLng(markerinfo.location.coordinates.lat, markerinfo.location.coordinates.lng);

    // imagens de marcadores personalizados
    var image_point = "https://cdn.rawgit.com/rhcarlosweb/google-maps-markers/9cafdad0/assets/images/ponto.png";
    var image_store = "https://cdn.rawgit.com/rhcarlosweb/google-maps-markers/9cafdad0/assets/images/loja.png";

    // imagem marcadores personalizados para cada tipo de local
    var icons = {
      loja: {
        icon: image_store
      },
      ponto: {
        icon: image_point
      }
    };

    // registro de marcadores
    var marker = new google.maps.Marker({
      title: title, // titulo marcador
      position: position, // posicao marcador
      icon: icons[markerinfo.type.slug].icon, // usa icone certo para cada tipo de marcador
      animation: google.maps.Animation.DROP, // animação drop marcador
      map: map, // registra marcador na variável map
      category: categories
    });

    // adiciona markers ao array
    markers.push(marker);

    // limite adicionado com posição de cada marcador
    bounds.extend(marker.position);

    // registro de conteúdo na caixa de informações
    // do marcador
    var currentMark;
    var infowindow = new google.maps.InfoWindow({
      content: '<a href="#" class="pull-left"> <img alt="image" class="img-circle" src="img/a1.jpg" style="width: 50px; margin: 0 20px -8px 20px;"> </a>' + '<h4 class="title-map">' + title + '<br></h4>' + '<small class="text-muted">Team Name</small>' + '<div class="endereco"></div>' + '<div class="telefone-map"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal2"  style="text-align: center;    margin-top: 15px;    width: 200px;    margin-left: 12px;">View Details</button></div>'
    });

    // exibe marcador quando clicado
    marker.addListener('click', function() {

      // zoom no marcador
      // map.setZoom(14);

      // centraliza mapa na posição do marcador
      // map.setCenter(marker.getPosition());

      // abre caixa informações marcador
      // infowindow.open(map, marker);
      infowindow.open(map, marker);


    });
    google.maps.event.addListener(map, 'click', function() {
      infowindow.close(map, marker);
    });
    // Exibe marcador quando hover
    // marker.addListener('mouseover', function() {
    //     infowindow.open(map, marker);
    // });
    // marker.addListener('mouseout', function() {
    //     infowindow.close();
    // });

  }

  /**
   * Form filtro
   */
  $('#buscar-locais').submit(function(event) {
    event.preventDefault();

    // valores filtros selecionado
    var countryValSel = [
      $('#pais').val(),
      $('#estado').val(),
      $('#cidade').val(),
      $('#setor').val(),
      $('#tipo').val(),
    ];

    // limite do mapa
    bounds = new google.maps.LatLngBounds();

    for (i = 0; i < markers.length; i++) {
      // addMarker(markers);

      var mark = markers;

      // If is same category or category not picked
      // if ((typeof mark.category == 'object' && mark.category.indexOf(countryValSel) >= 0) || countryValSel.length === 0) {
      if (objectsMatch(mark.category, countryValSel) || countryValSel.length === 0) {
        mark.setVisible(true);
        mc.setIgnoreHidden(true);
        bounds.extend(mark.getPosition());
      }
      // Categories don't match
      else {
        mc.setIgnoreHidden(true);
        mark.setVisible(false);
      }

    }
    // zoom mapa aos marcadores selecionados com
    // a categoria
    map.fitBounds(bounds);
  });

  // init map on load page
  $(window).load(function() {
    initMap();

    $('input[type="checkbox"]').change(function() {
      var checked = $("#" + this.id + ':checked');
      if (checked.length) {
        addMarker(this.id);
      } else {
        for (var i in markers) {
          if (markers[i].title == this.id) {
            markers[i].setMap(null);
            delete markers[i];
          }
        }
      }
      var values = (function() {
        var ids = [];
        $("#images").empty();
        $("input.listcheckbox[type='checkbox']:checked").each(function() {
          ids.push(this.id);

          var img = $("#" + this.id + "").next().children()["0"].outerHTML;
          $("#images").append('<div style="float: left;margin-right: 10px;"> <i class=" fa fa-times" id="' + this.id + '" style="float: right;font-size: 20px; margin-left: -10px;  margin-top: -10px;"></i>' + img + '</div>');
          if (this.id.toLowerCase().indexOf("site") >= 0) {
            $("i#" + this.id + "").next().css("border", "3px solid #1ab393");
          } else if (this.id.toLowerCase().indexOf("customers") >= 0) {
            $("i#" + this.id + "").next().css("border", "3px solid #ed5666");
          } else if (this.id.toLowerCase().indexOf("user") >= 0) {
            $("i#" + this.id + "").next().css("border", "3px solid #f8ac59");
          } else if (this.id.toLowerCase().indexOf("team") >= 0) {
            $("i#" + this.id + "").next().css("border", "3px solid #24c6c8");
          }
          $(".fa.fa-times").click(function() {
            for (var i in markers) {
              if (markers[i].title == this.id) {
                markers[i].setMap(null);
                delete markers[i];
                $("i#" + this.id + "").parent().remove();
                $("input#" + this.id + "").attr('checked', false);
                $("input#" + this.id + "").parent().removeClass("multiselect-on");
              }
            }
          });
        });
      })()
    });


    function addMarker(id) {
      if (id == "") {
        return;
      }
      if (id == "team-01") {
        var myLatlng = new google.maps.LatLng(26.32423123, 50.021525);
      } else if (id == "team-02") {
        var myLatlng = new google.maps.LatLng(26.302401, 43.994413);
      } else if (id == "team-03") {
        var myLatlng = new google.maps.LatLng(24.302401, 47.994413);

      } else if (id == "team-04") {
        var myLatlng = new google.maps.LatLng(22.502401, 40.994413);

      } else if (id == "team-05") {
        var myLatlng = new google.maps.LatLng(21.88888, 40.994413);

      } else if (id == "team-06") {
        var myLatlng = new google.maps.LatLng(20.302401, 43.994413);
      } else if (id == "team-07") {
        var myLatlng = new google.maps.LatLng(24.302401, 47.994413);

      } else if (id == "team-08") {
        var myLatlng = new google.maps.LatLng(22.234234, 40.994413);

      } else if (id == "team-09") {
        var myLatlng = new google.maps.LatLng(23.30211, 40.994413);

      } else if (id == "team-10") {
        var myLatlng = new google.maps.LatLng(20.302401, 43.994413);
      } else if (id == "team-11") {
        var myLatlng = new google.maps.LatLng(24.302401, 47.48564);

      } else if (id == "team-12") {
        var myLatlng = new google.maps.LatLng(22.502401, 40.994413);

      } else if (id == "team-13") {
        var myLatlng = new google.maps.LatLng(20.99993, 40.994413);

      } else if (id == "team-14") {
        var myLatlng = new google.maps.LatLng(20.67878, 39.994413);

      } else if (id == "Sites-01") {
        var myLatlng = new google.maps.LatLng(24.302401, 43.994413);

      } else if (id == "Sites-02") {
        var myLatlng = new google.maps.LatLng(26.234234, 42.994413);

      } else if (id == "Sites-03") {
        var myLatlng = new google.maps.LatLng(27.78678, 43.994413);

      } else if (id == "Sites-04") {
        var myLatlng = new google.maps.LatLng(30.302401, 43.994413);

      } else if (id == "Users-01") {
        var myLatlng = new google.maps.LatLng(24.88888, 42.994413);

      } else if (id == "Users-02") {
        var myLatlng = new google.maps.LatLng(26.768678, 42.994413);

      } else if (id == "Users-03") {
        var myLatlng = new google.maps.LatLng(27.302401, 41.123123123);

      } else if (id == "Users-04") {
        var myLatlng = new google.maps.LatLng(25.67678, 43.994413);

      } else if (id == "Customers-01") {
        var myLatlng = new google.maps.LatLng(24.302401, 43.994413);

      } else if (id == "Customers-02") {
        var myLatlng = new google.maps.LatLng(26.302401, 42.994413);

      } else if (id == "Customers-03") {
        var myLatlng = new google.maps.LatLng(30.302401, 43.994413);

      } else if (id == "Customers-04") {
        var myLatlng = new google.maps.LatLng(39.302401, 43.994413);

      }
      if (id.toLowerCase().indexOf("site") >= 0) {
        var icon_img = "../fs_test/img/m2.png";
      } else if (id.toLowerCase().indexOf("customers") >= 0) {
        var icon_img = "../fs_test/img/m3.png";
      } else if (id.toLowerCase().indexOf("user") >= 0) {
        var icon_img = "../fs_test/img/m4.png";
      } else if (id.toLowerCase().indexOf("team") >= 0) {
        var icon_img = "../fs_test/img/m1.png";
      }

      var marker = new google.maps.Marker({
        position: myLatlng,
        title: id,
        icon: icon_img,
        animation: google.maps.Animation.DROP,
        map: map
      });
      markers.push(marker);
      marker.setMap(map);
      // To add the marker to the map, call setMap();


    }


  });


  /**
   * Função verifica se objetos são identicos
   */
  function objectsMatch(roll, filterObject) {
    var match = true;
    for (var prop in filterObject) {
      if (!roll.hasOwnProperty(prop) ||
        !filterObject.hasOwnProperty(prop)) continue;
      if (roll[prop] != filterObject[prop] &&
        filterObject[prop] !== ''
      ) {
        match = false;
      }
    }
    return match;
  }

});
