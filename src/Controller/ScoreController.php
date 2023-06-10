<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ScoreController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/update-score", name="update_score", methods={"POST"})
     */
    public function updateScore(Request $request): Response
    {
        // Récupérer les données JSON envoyées dans la requête
        $data = json_decode($request->getContent(), true);

        // Vérifier si la clé "score" existe dans les données
        if (array_key_exists('score', $data)) {
            $score = $data['score'];
            // Faites quelque chose avec la valeur du score, par exemple, mettre à jour votre modèle de données, effectuer des calculs, etc.
        } else {
            // La clé 'score' n'est pas définie dans les données JSON
            // Traitez cette situation en conséquence
        }

        // Autres opérations liées à la mise à jour du score

        return new Response('Score updated');
    }
}
