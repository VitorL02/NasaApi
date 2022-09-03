const searchDate = document.getElementById("date-search");
const imageDay = document.getElementById("image-day");
const titleOfImageDay = document.getElementById("title");
const informationsOfDay = document.getElementById("information");
const copyOfImage = document.getElementById("copy");
const apiKey = 'api_key=kf7s4aWYKUKRHxa6rYXKen5H5r226ZBJySINZMgP';
const notFoundImage = "assets/not-found.png";
const notFoundTitle = "Ops! Não foi encontrado um imagem do dia";
const notFoundMensage = "Provalvelmente você está pesquisando uma data onde não possuem dados especificos,tenta de novo ai!<br>Dica: Não é possivel exibir imagens de dias futuros!";
let date = new Date().toISOString().split('T')[0];

const fetchNasaApi = async (date) => {
        searchDate.value = date;

        const request = await fetch(`https://api.nasa.gov/planetary/apod?${apiKey}&date=${date}`);

        if(request.status === 200){
        const data = await request.json();
        console.log(data);
        createCard(data.url,data.title,data.explanation,data.copyright);
        return data;
        }else{
                createCard(notFoundImage,notFoundTitle,notFoundMensage);     
        }
        

}

const createCard = (url,title,infomations,copy) =>{
        imageDay.src = url;
        titleOfImageDay.innerHTML = title;
        informationsOfDay.innerHTML = infomations;
        copyOfImage.innerHTML = `Quem Tirou essa foto sensacional foi: ${copy} &copy; `

}



searchDate.addEventListener('change',(element)=>{
    element.preventDefault();
   if(searchDate.value){
    fetchNasaApi(searchDate.value);
   }
});



    
fetchNasaApi(date); 