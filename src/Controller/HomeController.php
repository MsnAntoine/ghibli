<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class HomeController extends AbstractController
{

    #[IsGranted("ROLE_USER")]
#[Route('/auth', name: 'app_home')]
    public function index(): Response
    {
        return $this->render('base.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
#[Route('/', name: 'app_acceuil')]
    public function pageacceuil(): Response
    {
        return $this->render('pageacceuil.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

    #[Route('/jeux', name: 'app_dino')]
    public function dino(): Response
    {
        return $this->render('Jeux/dino.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
  
  #[Route('/rock', name: 'app_rock')]
    public function rock(): Response
    {
        return $this->render('rock/rock.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
  
     #[Route('/galerie', name: 'app_galerie')]
    public function galerie(): Response
    {
        return $this->render('galerie.html.twig', [
           'controller_name' => 'HomeController',
        ]);
    }

    #[Route('/ghibli1', name: 'app_ghibli1')]
    public function ghibli1(): Response
    {
        return $this->render('home/ghibli1.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
    #[Route('/ghibli2', name: 'app_ghibli2')]
    public function ghibli2(): Response
    {
        return $this->render('home/ghibli2.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
    #[Route('/ghibli3', name: 'app_ghibli3')]
    public function ghibli3(): Response
    {
        return $this->render('home/ghibli3.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
    #[Route('/ghibli4', name: 'app_ghibli4')]
    public function ghibli4(): Response
    {
        return $this->render('home/ghibli4.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
    #[Route('/carte', name: 'app_carte')]
    public function carte(): Response
    {
        return $this->render('home/carte.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
    #[Route('/apropos', name: 'app_apropos')]
    public function apropos(): Response
    {
        return $this->render('home/apropos.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
    #[Route('/accjeux', name: 'app_accjeux')]
    public function accjeux(): Response
    {
        return $this->render('home/accjeux.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
}
