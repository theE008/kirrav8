function ir_para(local)
{

  window.location.href = local + ".html";
  
}

//////////////////////////////////////////////////////////////////////////////////////

function exibir_alerta(mensagem, titulo) 
{
  
  Swal.fire({
    title: titulo,
    text: mensagem,
    icon: 'success',
    confirmButtonText: 'OK'
  });
  
};

function exibir_alerta_info(mensagem, titulo) 
{
  
  Swal.fire({
    title: titulo,
    text: mensagem,
    icon: 'info',
    confirmButtonText: 'OK'
  });
  
};

//////////////////////////////////////////////////////////////////////////////////////

async function exibir_input(mensagem) {  
  const resultado = await Swal.fire({
    title: mensagem,
    input: 'text',
    showCancelButton: true,
    confirmButtonText: 'Enviar',
    cancelButtonText: 'Cancelar',
    showLoaderOnConfirm: true,
    preConfirm: (valor) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          /*if (valor === 'exemplo') {
            Swal.showValidationMessage('Esse valor não é permitido!');
          }*/
          resolve(valor);
        }, 1000);
      });
    },
    allowOutsideClick: () => !Swal.isLoading()
  });

  return resultado.value;
}

//////////////////////////////////////////////////////////////////////////////////////

const tituloElement = document.getElementById('titulo');

const estilos = [
  { fonte: 'Arial, Helvetica, sans-serif', cor: 'red', italico: true, negrito: false },
  { fonte: 'Verdana, Geneva, sans-serif', cor: 'blue', italico: false, negrito: true },
  { fonte: 'Times New Roman, Times, serif', cor: 'green', italico: true, negrito: true },
  { fonte: 'Courier New, Courier, monospace', cor: 'purple', italico: false, negrito: false },
  { fonte: 'Georgia, serif', cor: 'orange', italico: true, negrito: true },
  { fonte: 'Impact, Charcoal, sans-serif', cor: 'brown', italico: false, negrito: true },
  { fonte: 'Comic Sans MS, cursive, sans-serif', cor: 'teal', italico: true, negrito: false },
  { fonte: 'Tahoma, Geneva, sans-serif', cor: 'maroon', italico: false, negrito: true },
  { fonte: 'Palatino Linotype, Book Antiqua, Palatino, serif', cor: 'navy', italico: true, negrito: false },
  { fonte: 'Lucida Console, Monaco, monospace', cor: 'olive', italico: false, negrito: false }
];

function aplicarEstiloAleatorio () 
{
  var isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) 
  {
      return; // Não aplica estilos em dispositivos móveis
  }
  
  var estiloAleatorio = estilos[Math.floor(Math.random() * estilos.length)];
  tituloElement.style.fontFamily = estiloAleatorio.fonte;
  
  var estiloAleatorio = estilos[Math.floor(Math.random() * estilos.length)];
  tituloElement.style.color = estiloAleatorio.cor;
  
  var estiloAleatorio = estilos[Math.floor(Math.random() * estilos.length)];
  tituloElement.style.fontStyle = estiloAleatorio.italico ? 'italic' : 'normal';
  
  var estiloAleatorio = estilos[Math.floor(Math.random() * estilos.length)];
  tituloElement.style.fontWeight = estiloAleatorio.negrito ? 'bold' : 'normal';
}

function voltar_titulo()
{

  tituloElement.style.fontFamily = 'Arial, Helvetica, sans-serif';
  tituloElement.style.fontStyle = 'italic';
  tituloElement.style.fontWeight = 'bold';
  tituloElement.style.color = 'var(--c3)';
  clearInterval(intervalo);
  
}

// Aplicar estilo a cada meio segundo
let contador = 0;
const intervalo = setInterval(() => {
  aplicarEstiloAleatorio();
  contador++;
  if (contador === 5) {

    voltar_titulo();

  }
}, 400);

//talvez inutil

// Função para aplicar estilos aleatórios
function aplicarEstilosAleatorios() 
{
    // Verifica se o dispositivo é móvel
    var isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) 
    {
        return; // Não aplica estilos em dispositivos móveis
    }

    // Seleciona todos os elementos com a classe "jeff"
    var elementosJeferson = document.getElementsByClassName("jeff");

    // Se não houver elementos, para o relógio
    if (elementosJeferson.length === 0) 
    {
        clearInterval(intervalId);
        return;
    }

    // Itera sobre todos os elementos e aplica estilos aleatórios
    for (var i = 0; i < elementosJeferson.length; i++) 
    {
        var zeta = elementosJeferson[i];

        var estiloAleatorio = estilos[Math.floor(Math.random() * estilos.length)];
        zeta.style.fontFamily = estiloAleatorio.fonte;

        estiloAleatorio = estilos[Math.floor(Math.random() * estilos.length)];
        zeta.style.color = estiloAleatorio.cor;

        estiloAleatorio = estilos[Math.floor(Math.random() * estilos.length)];
        zeta.style.fontStyle = estiloAleatorio.italico ? 'italic' : 'normal';

        estiloAleatorio = estilos[Math.floor(Math.random() * estilos.length)];
        zeta.style.fontWeight = estiloAleatorio.negrito ? 'bold' : 'normal';
    }
}

// Inicializa o relógio setInterval
var intervalId = setInterval(aplicarEstilosAleatorios, 400);

//


//////////////////////////////////////////////////////////////////////////////////////

const minhaDiv = document.querySelector('#titulo');
let interval;

minhaDiv.addEventListener('mouseover', function() {
  interval = setInterval(rodarFuncao, 500);
});

minhaDiv.addEventListener('mouseout', function() 
{
  
  voltar_titulo();
  clearInterval(interval);
  
});

function rodarFuncao() 
{

  aplicarEstiloAleatorio();
  
}

function adicionar_prompt_especifico( id, mensagem, onde_salvar )
{
    
  document.getElementById(id).onclick = async function () {
    var info = await exibir_input(mensagem);
  
    if (info) {
      localStorage.setItem(onde_salvar, info);
      document.getElementById(id).innerHTML = info;
    }
  };
    
}

function gerarNomeAleatorio() 
{
  var nomes_a;
  var nomes_b;
  
  if (localStorage.getItem ("nsfw") == "true")
  {
    nomes_a = ['Ali', 'Li', 'Letí', 'Ja', 'Jate', "Chu", 'Pican', 'Seu' , "Belo", "Bulce", "Bel", 'No', 'Se', 'Bo', 'Bun', 'Char', "Fi", "Fida", 'Di', 'E', 'Fran', 'Gra', 'Hen', "Ju", "Kar", "Lar", "Mar", "Nat", "Ori", "Pau", "Qui", "Ran", 'Tono', 'Comiç', "Sab", "Tan", "Uli", "Vic", "Wes", "Thi", "Xan", "Yan", "Zan", 'Jef', 'Bian', 'Bru'];
    nomes_b = ['ce', 'pei', "boga", 'da', 'b', "puwa", 'pai', "tão", "ago", 'xo', "popau", "pau", 'cu', 'lie', 'rceu', 'du', 'via', 'cisco', 'cia', 'cio', 'cias', 'ry', 'ca', 'en', 'zaro', 'celão', 'alia', 'undo', 'duro', 'tandeiro', 'abunda', 'ida', 'gente', 'cersos', 'comi', 'uontem', 'leysafadão', 'dão', 'no', 'na', 'dere', 'gado', 'ferson'];
  }
  else
  {
    nomes_a = ['Ali', "Li", "Letí", "Jack", "Thi", "Fran", "Gab", "Jo", "Mar", "Ana", "Flá"];
    nomes_b = ['ce', "sson", "via", "nda", "cia", "son", "", "ago", "lda", "cisco", "cisca", "riel", "riela", "riele", "ão", "ana", "nathan", "cos", "via", "vio"];
  }
    
  var nomeAleatorio_a = nomes_a[Math.floor(Math.random() * nomes_a.length)];
  var nomeAleatorio_b = nomes_b[Math.floor(Math.random() * nomes_b.length)];
  var nomeAleatorio_A = nomes_a[Math.floor(Math.random() * nomes_a.length)];
  var nomeAleatorio_B = nomes_b[Math.floor(Math.random() * nomes_b.length)];

  var nome_a = `${nomeAleatorio_a}${nomeAleatorio_b}`;
  var nome_b = `${nomeAleatorio_A}${nomeAleatorio_B}`;
  
  if (nome_a == "Jefferson")
  {
  nome_a = "<span class='jeff'>Jeferson</span>";
  aplicarEstilosAleatorios();
  }

  if (nome_b == "Jefferson")
  {
  nome_b = "<span class='jeff'>Jeferson</span>";
  aplicarEstilosAleatorios();
  }

  if (nome_a == "Thiago" || nome_b == "Thiago")
  {
  document.getElementById('profile-random-nome').style.display = 'none';
  }

  return `${nome_a} ${nome_b}`;
}

// &

function cor_load()
{
  if(localStorage.getItem("cor-cabec"))
  {
     document.documentElement.style.
       setProperty('--c1', localStorage.getItem("cor-cabec"));
     document.documentElement.style.
       setProperty('--c2', localStorage.getItem("cor-extra"));
     document.documentElement.style.
       setProperty('--c3', localStorage.getItem("cor-titul"));
     document.documentElement.style.
       setProperty('--c4', localStorage.getItem("cor-espec"));
    document.documentElement.style.
       setProperty('--c5', localStorage.getItem("cor-bkgMe"));
    document.documentElement.style.
       setProperty('--c6', localStorage.getItem("cor-txtMe"));
    document.documentElement.style.
       setProperty('--c7', localStorage.getItem("cor-borda"));
     document.documentElement.style.
       setProperty('--c8', localStorage.getItem("cor-fundo"));
  }
}

cor_load();

function nomear_site(on_temas)
  {
    if (localStorage.getItem("sitename"))
    {
        document.getElementById('titulo').innerHTML = localStorage.getItem("sitename");
        document.title = localStorage.getItem("sitename");

        if(on_temas)
        document.getElementById('div3-atual').innerHTML =localStorage.getItem("sitename");
    }
  }

nomear_site(0);

if (!localStorage.getItem("nome"))
{
  ir_para('intro');
}

var elemento = document.getElementById('mudar-chat');
if(elemento)
    elemento.addEventListener('click', function() {
      exibir_input("Qual chat gostaria de ir?")
        .then(function (resposta)
              {
                  localStorage.setItem('chat', resposta);
                
                  var pfpsvr = document.getElementById('profile-server'); // <- nem ideia do que isso é. acho que era o sistema desativado de subtítulos
                  if(pfpsvr)
                    pfpsvr.innerHTML = resposta;

                  var grlsvr = document.getElementById('chat');
                  if(grlsvr)
                    {
                        grlsvr.innerHTML = resposta;
                    }
        
                  if (resposta == "flocos de milho" && localStorage.getItem ("nsfw") != "true") 
                  {
                    exibir_alerta_info ("Modo explícito ativado", "Atenção");
                    
                    localStorage.setItem ("nsfw", "true");
                  }
                  //location.reload(); // <- resposta medieval, mas não sei como fazer melhor!
                  ir_para ('index'); // <- agora sim, mais sofisticado!
      });
    });