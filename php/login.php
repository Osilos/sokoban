<?php

error_reporting(E_ALL);

session_start();
include('./config.php');
$login = $_POST['login'];

try
{
    $connexion = new PDO($source, $user,$motDePasse);
    $requete = "SELECT ID FROM login WHERE pseudo = '".$login."'";
    $resultat = $connexion->query($requete);

    if($resultat->rowCount() > 0)
    {
        $_SESSION['login'] = $login;
        
    }
    else
    {
        $requete = "INSERT INTO `sokoban15`.`login` (`ID`, `pseudo`) VALUES (NULL, '".$login."');";
        $resultat = $connexion->query($requete);
        $_SESSION['login'] = $login;
        
    }
    header('Location: ../sokoban.html');
}



catch (PDOException $e)
{
    print 'Erreur PDO : '.$e->getMessage().'
<br />
';
    die();
}
?>