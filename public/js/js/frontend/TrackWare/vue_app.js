/**
 * Created by samir on 4/17/2016.
 
var RingLoader = VueSpinner.RingLoader;
Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('content');
var app = new Vue({
    el: '#search',

    data: {
        nodes: [],
        loading: false,
        customer_name: ''
    },
    components: {
        RingLoader
    },
    ready: function () {
        /!*
         Show all available contacts
         *!/
        this.loadNodes();
    },

    methods: {
        searchNodes: function (val) {
            this.loading = true;
            if (val != undefined) {
                com.trackware.Marker.clear();
                //console.log(response);
                this.$http.post('/search_node', {'customer_name': val}).then(function (response) {
                    if (response.data.length > 0) {
                        this.nodes = response.data;
                        for (var i = 0; i < response.data.length; i++) {
                            var latlong = response.data[i]['latlong'];
                            var customer_name = response.data[i]['name'];
                            com.trackware.Map.instance.addMarker(latlong, customer_name);
                        }
                        this.loading = false;
                    } else {
                        this.nodes = '';
                        this.loading = false;
                    }
                }, function (response) {
                    console.log(response);
                });
            } else {
                this.nodes = '';
                this.loading = false;
            }
        },

        loadNodes: function () {
            this.loading = true;
            com.trackware.Marker.clear();
            //console.log(response);
            this.$http.get('/get_Nodes').then(function (response) {
                var nodes_data = response.data.data;
                if (nodes_data.length > 0) {
                    this.nodes = nodes_data;
                    for (var i = 0; i < nodes_data.length; i++) {
                        var latlong = nodes_data[i]['latlong'];
                        var customer_name = nodes_data[i]['name'];
                        com.trackware.Map.instance.addMarker(latlong, customer_name);
                    }
                    this.loading = false;
                } else {
                    this.nodes = '';
                    this.loading = false;
                }
            }, function (response) {
                console.log(response);
            });
        }
    }
});

app.$watch('customer_name', function (val) {
    app.searchNodes(val);
});*/
