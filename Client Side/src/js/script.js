$(document).ready(function() {
    globalId = 0;

    // Consultar departamentos
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/departamentos",
        dataType: "json",
        success: function(data, textStatus) {
            //process data            
            let departmentListOptions = ''
            
            data.departamentos.forEach((element) => {
                departmentListOptions += `<option>${element}</option>`
            });

            let departmentListContainer = `<select id="departmentId" name="departamento" class="form-control">${departmentListOptions}</select>`
            $('#departmentListRender').append(departmentListContainer)

            $("#departmentId").on('change',function(){
                var getValue=$(this).prop('selectedIndex');
                globalId = getValue;
            });
        },
        error: function(data, textStatus) {
            //process error msg
            console.log(data);
        },
    });

    // Consultar Ciudades
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/ciudades",
        dataType: "json",
        success: function(data, textStatus) {
            let defaultData = data.ciudades[0]
            let defaultOption = ''

            defaultData.forEach(element => {
                defaultOption += `<option>${element}</option>`
            });

            let defaultContainer = `<select class="form-control" name="ciudad">${defaultOption}</select>`
            $('#cityListRender').html(defaultContainer)            

            $(document).on('change', '#departmentListRender', function() {
                currentId = globalId

                let citesListOptions = ''

                const citiesContainer = data.ciudades[currentId]

                citiesContainer.forEach(element => {
                    citesListOptions += `<option>${element}</option>`
                });

                let cityListContainer = `<select name="ciudad" class="form-control">${citesListOptions}</select>`
                $('#cityListRender').html(cityListContainer)

            });
        },
        error: function(data, textStatus, jqXHR) {
        //process error msg
        console.log(data);
        },
    });

    // Send contact Information
    $('#contactInformation').validate({
        
        rules: {
            nombre: {
                required: true, 
                maxlength: 50,
            }, 
            email: {
                required: true, 
                maxlength: 30,
            }
        },
        invalidHandler: function(event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                var message = errors === 1
                  ? 'You missed 1 field. It has been highlighted'
                  : `<span class="text-danger">You missed ${errors} fields. They have been highlighted<span>`;  
            }
        },

        submitHandler: function (form) {
            let url = 'http://localhost:8080/sendContactInformation';

            let formData = $(form).serialize();

            $.ajax({
                type: "POST",
                url,
                data: formData,
                dataType : 'json',
                success: function(data, textStatus, jqXHR) {
                    //process data
                    $("#successMessage").modal("show");
                    console.log(data)    

                },
                error: function(data, textStatus, jqXHR) {
                //process error msg
                console.log(data.textStatus);
                },
            });
        }
    });
});