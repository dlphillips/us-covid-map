const map = L.map('map', {
  center: [38.119880, -96.967784],
  zoom: 5
})

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map)

const minValue = 1

const minRadius = 2

L.geoJson(data, {
  onEachFeature: function (feature, layer) {
    if (feature.properties && feature.properties.Combined_k) {
      const popup = "<h3>" + feature.properties.Combined_k + "</h3>" + "<table>" +
        "<tbody>" +
        "<tr>" +
        "<td> Cases </td>" +
        "<td> " + feature.properties.Confirmed + " </td>" +
        "</tr>" +
        "<tr>" +
        "<td> Deaths </td>" +
        "<td> " + feature.properties.Deaths + " </td>" +
        "</tr>" +
        "<tr>" +
        "<td> Recovered </td>" +
        "<td> " + feature.properties.Recovered + " </td>" +
        "</tr>" +
        "<tr>" +
        "<td><h3>" + "<a href='https://www.google.com/search?q=" + feature.properties.Combined_k + " covid-19' target='_blank'" + "> Latest News </a>" + " </h3></td>" +
        "</tr>" +
        "</tbody>" +
        "</table>"

      layer.bindPopup(popup, { closeButton: false, offset: L.point(0, -20) })
    }
  },
  pointToLayer: function (feature, ll) {
    return L.circleMarker(ll, {
      color: '#ff7900',
      opacity: .9,
      weight: 2,
      fillColor: '#ff7900',
      fillOpacity: .8,
      radius: calcRadius(feature.properties.Confirmed)
    })
  }
}).addTo(map)

L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/adminb/webmercator/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

function calcRadius(val) {
  return 1.0083 * Math.pow(val / minValue, .35) * minRadius
}