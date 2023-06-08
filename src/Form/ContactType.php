<?php

namespace App\Form;

use App\Entity\Contact;
use Doctrine\DBAL\Types\DateType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('sujet', TextType::class, [
                'attr'=>[
                    'placeholder'=>'Le sujet de votre message : '
                ]
            ])
            ->add('date', \Symfony\Component\Form\Extension\Core\Type\DateType::class,[
                'attr'=>[
                    'id'=>'inptDate'
                ]
            ])
            ->add('message', TextareaType::class, [
                'attr'=>[
                    'placeholder'=>'Votre message : ',
                    'id'=>'message',
                ]
            ])
            ->add('statut', ChoiceType::class, [
                'choices'=>[
                    '--Quel est le statut de votre message ?--' =>'',
                    'Validé'=>'valide',
                    'Refusé'=>'refuse',
                    'En Cours'=>'en cours',

                    'id'=>'statutContact'

                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Contact::class,
        ]);
    }
}
