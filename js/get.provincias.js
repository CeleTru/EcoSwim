const selectProvincias = document.getElementById("selectProvincias");
const selectLocalidades = document.getElementById("selectLocalidades");

// Obtener provincias y llenar el select de provincias
fetch("php/get.provincias.php")
  .then(response => response.json())
  .then(data => {
    if (data.provincias) {
      data.provincias.forEach(provincia => {
        const option = document.createElement("option");
        option.value = provincia.id;
        option.text = provincia.nombre;
        selectProvincias.appendChild(option);
      });
    }
  })
  .catch(error => {
    console.error("Error al obtener las provincias: " + error);
  });

// Obtener localidades según la provincia seleccionada
selectProvincias.addEventListener("change", function() {
  const provinciaId = selectProvincias.value;
  const localidadesUrl = `https://apis.datos.gob.ar/georef/api/localidades?provincia=${provinciaId}&campos=id,nombre&max=1000`;

  // Limpiar el select de localidades
  selectLocalidades.innerHTML = "";

  // Obtener las localidades y llenar el select de localidades
  fetch(localidadesUrl)
    .then(response => response.json())
    .then(data => {
      if (data.localidades) {
        data.localidades.forEach(localidad => {
          const option = document.createElement("option");
          option.value = localidad.id;
          option.text = localidad.nombre;
          selectLocalidades.appendChild(option);
        });
      }
    })
    .catch(error => {
      console.error("Error al obtener las localidades: " + error);
    });
});

document.getElementById("contacto").addEventListener("submit", function(event) {
  event.preventDefault(); // Evitar el envío automático del formulario

  const name = document.getElementById("name").value;
  const telefono = document.getElementById("telefono").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const provincia = selectProvincias.options[selectProvincias.selectedIndex].text;
  const localidad = selectLocalidades.options[selectLocalidades.selectedIndex].text;
  const modeloInteres = document.querySelector(".modelo").value;
  const formaPago = document.querySelector(".formapago").value;

  // Construir los datos a enviar por correo
  const formData = new FormData();
  formData.append("name", name);
  formData.append("telefono", telefono);
  formData.append("email", email);
  formData.append("message", message);
  formData.append("provincia", provincia);
  formData.append("localidad", localidad);
  formData.append("modeloInteres", modeloInteres);
  formData.append("formaPago", formaPago);

  // Enviar los datos utilizando FormSubmit
  fetch("php/enviar_formulario.php", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log("Respuesta del envío por correo:", data);
      // Aquí puedes realizar cualquier acción adicional después del envío, como mostrar un mensaje de confirmación al usuario
    })
    .catch(error => {
      console.error("Error al enviar el formulario:", error);
      // Aquí puedes manejar cualquier error que ocurra durante el envío del formulario
    });
});