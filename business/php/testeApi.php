
<html>
    <head>
        <title>Teste Api</title>  
    </head>
    <body>
        <?php
        include 'connect.php';
        
        $sql = "SELECT * from registro_de_compras ";
        $query = $conexao->query($sql);
        while ($dados = $query->fetch_assoc()) {
            $ref = $dados['ref'];
            $status = $dados['status'];
            
            echo"<h1>ref: $ref /////// status : $status</h1>";
            
            
        }
        ?>
    </body>
</html>