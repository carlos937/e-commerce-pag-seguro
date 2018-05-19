
        <?php 
require 'config.php';
use OpenBoleto\Banco\BancoDoBrasil;
use OpenBoleto\Agente;
 
$sacado = new Agente('Fernando Maia', '023.434.234-34', 'ABC 302 Bloco N', '72000-000', 'Brasília', 'DF');
$cedente = new Agente('Empresa de cosméticos LTDA', '02.123.123/0001-11', 'CLS 403 Lj 23', '71000-000', 'Brasília', 'DF');
 
$boleto = new BancoDoBrasil(array(
    // Parâmetros obrigatórios
    'dataVencimento' => new DateTime('2018-01-24'),
    'valor' => 23.00,
    'sequencial' => 1234567, // Para gerar o nosso número
    'sacado' => $sacado,
    'cedente' => $cedente,
    'agencia' => 1724, // Até 4 dígitos
    'carteira' => 18,
    'conta' => 10403005, // Até 8 dígitos
    'convenio' => 1234, // 4, 6 ou 7 dígitos
));
 
echo $boleto->getOutput();
?>
<!--        </div>
    </body>
</html>
    -->
    <script>
        window.onload = function(){
          document.querySelector("body").setAttribute("id","body");  
          document.querySelector("body div").style.margin = "auto";  
          document.querySelector("body div").style.width = "max-width:70%;";  
          var linkBootstrap = document.createElement('link');
          linkBootstrap.setAttribute("rel","stylesheet");
          linkBootstrap.setAttribute("href","https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");
          document.querySelector("head").appendChild(linkBootstrap);  

          
          var button = document.createElement('input');
          button.setAttribute("type","button");
          button.onclick = function(){
              window.print();
          };
          button.className = 'btn btn-primary botao';
          button.value="imprimir";
          button.style.position="fixed";
          button.style.zIndex="999";
          button.style.top="2%";
          button.style.right="2%";
          button.style.width="20%";
          document.querySelector("body").appendChild(button);  
          
          var button2 = document.createElement('a');
          button2.setAttribute("href","index.php");
          button2.className = 'btn btn-primary botao';
          button2.innerHTML="Voltar";
          button2.style.position="fixed";
          button2.style.zIndex="999";
          button2.style.top="12%";
          button2.style.right="2%";
          button2.style.width="20%";
          document.querySelector("body").appendChild(button2);  
       
          
          
        };
    </script>    
    <style>
        @media print{
            .botao{
                display: none;
            }
        }
    </style>
      