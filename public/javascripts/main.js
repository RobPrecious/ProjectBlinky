function test() {
  console.log("Testing: " + $('#url').val());

  $.post("http://localhost:3001", {
    url: $('#url').val(),
    crossDomain: true,
  }).done(data => {
    if (data) {
      var output = "<table class='table'>";
      output += "<tr><th>Id</th><th>Description</th><th>Help</th><th>Issue Source</th></tr>";
      data.results.violations.map(v => {
        output += "<tr>";
        output += "<td>" + v.id + "</td>";
        output += "<td>" + v.description + "</td>";
        output += "<td>" + v.help + "</td>";
        output += "<td><xmp>" + v.nodes[0].html + "</xmp></td>";
        output += "</tr>";
      })
      output += "</table>";
      $("#results").html(output);
    }
  });
}