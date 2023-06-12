<?php

namespace App\Form;

use App\Entity\User;
use Karser\Recaptcha3Bundle\Form\Recaptcha3Type;
use Karser\Recaptcha3Bundle\Validator\Constraints\Recaptcha3;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Regex;


class RegistrationFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('username', \Symfony\Component\Form\Extension\Core\Type\TextType::class, [
                'attr' => [
                    'placeholder' => 'Pseudo :'
                ],
                'constraints' => [
                    new NotBlank(),
                    new Regex([
                        'pattern' => '/^[a-zA-Z]+$/',
                        'message' => 'Votre Pseudo est invalide'
                    ])
                ]
            ])

            ->add('nom', \Symfony\Component\Form\Extension\Core\Type\TextType::class, [
                'attr' => [
                    'placeholder' => 'Nom :'
                ],
                'constraints' => [
                    new NotBlank(),
                    new Regex([
                        'pattern' => '/^[a-zA-Z]+$/',
                        'message' => 'Votre Nom est invalide'
                    ])
                ]
            ])

            ->add('prenom', \Symfony\Component\Form\Extension\Core\Type\TextType::class, [
                'attr' => [
                    'placeholder' => 'Prénom :'
                ],
                'constraints' => [
                    new NotBlank(),
                    new Regex([
                        'pattern' => '/^[a-zA-Z]+$/',
                        'message' => 'Votre Prénom est invalide'
                    ])
                ]
            ])
            ->add('telephone', \Symfony\Component\Form\Extension\Core\Type\TextType::class, [
                'attr' => [
                    'placeholder' => 'Téléphone :'
                ],
                'constraints' => [
                    new NotBlank(),
                    new Regex([
                        'pattern' => '/^0\d{9}$/',
                        'message' => 'Le numéro de téléphone est invalide'
                    ]),
                    new length([
                        'min'=>10,
                        'max'=>10
                    ])
                ]
            ])
            ->add('ville', \Symfony\Component\Form\Extension\Core\Type\TextType::class, [
                'attr' => [
                    'placeholder' => 'Ville :'
                ],
                'constraints' => [
                    new NotBlank(),
                    new Regex([
                        'pattern' => '/^[a-zA-Z]+$/',
                        'message' => 'Votre Ville est invalide'
                    ])
                ]
            ])
            ->add('mail', \Symfony\Component\Form\Extension\Core\Type\TextType::class, [
                'attr' => [
                    'placeholder'=>'Email :',
                    'autocomplete' => 'off'
                ],
                'constraints' => [
                    new NotBlank(),
                    new Email([
                        'message' => '{{ value }} n\'est pas valide',
                        'mode'=>'strict'
                    ])
                ]
            ])
            ->add('agreeTerms', CheckboxType::class, [
                'mapped' => false,
                'constraints' => [
                    new IsTrue([
                        'message' => 'You should agree to our terms.',
                    ]),
                ],
            ])
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'invalid_message' => 'Les champs de mot de passe doivent correspondre.',
                'options' => ['attr' => ['class' => 'password-field']],
                'required' => true,
                'first_options'  => [
                    'label' => false,
                    'attr' => [
                        'placeholder' => 'Mot de passe :'
                    ]
                ],
                'second_options' => [
                    'label' => false,
                    'attr' => [
                        'placeholder' => 'Répéter le mot de passe :'
                    ]
                ],
                'constraints'=>[
                    new NotBlank([
                        'message'=>'Veuillez insérer un mot de passe',
                    ]),
                    new Length([
                        'min' => 6,
                        'minMessage' => 'Votre mot de passe doit comporter au moins {{ limit }} caractères',
                        // longueur maximale autorisée par Symfony pour des raisons de sécurité
                        'max' => 4096,
                    ]),
                ],
                'attr'=>[
                    'autocomplete'=>'new-password',
                ]
            ])
//            ->add('capcha', Recaptcha3Type::class,[
//                'constraints'=> new Recaptcha3(),
//                'action_name'=>'user'
//            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
