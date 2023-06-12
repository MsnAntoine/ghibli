<?php


namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ScoreController extends AbstractController
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
                try{
                    // Récupérer l'utilisateur connecté
                    $user = $this->getUser();
                    // Vérifier si l'attribut score existe dans l'user
                    if (isset($data['score'])) {
                        $score = $data['score'];




                        if ($user) {
                            $user->setScore($score);
                            $this->entityManager->flush();
                        } else {
                            throw new \Exception('User not found');
                        }

                        return new JsonResponse(['message' => 'Score updated']);
                    } else {
                        throw new \Exception('Invalid data: "score" key not found');
                    }



                }catch (\Exception $e) {
                    return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
                }



    }

}
