console.log("Client side JS loaded!");

let form = document.querySelector('form');
const success_message = document.querySelector('p#success_message');
const error_message = document.querySelector('p#error_message');

form.addEventListener('submit',(e)=>{
    let location = form.querySelector('input[name="location"');
    success_message.textContent = 'Fetching weather data';
    error_message.textContent = '';
    //debugger;
    fetch(`http://localhost:3000/weather?address=${location.value}`)
        .then((resp)=>{
            resp.json()
                .then((data) => {
                    if(!!data.error){
                        console.error(data.error);
                        success_message.textContent = '';
                        error_message.textContent = data.error;
                    }
                    else {
                        console.log(data);
                        const message = `Full address : ${data.location} Forecast: ${data.forecast}`;
                        success_message.textContent = message;
                    }
                });
        });
    e.preventDefault();
});