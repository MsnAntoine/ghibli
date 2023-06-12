<?php

namespace App\Form;

use App\Entity\User;
use Doctrine\DBAL\Types\TextType;
use Karser\Recaptcha3Bundle\Form\Recaptcha3Type;
use Karser\Recaptcha3Bundle\Validator\Constraints\Recaptcha3;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
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
            ->add('password', PasswordType::class, [
                // instead of being set onto the object directly,
                // this is read and encoded in the controller
                'mapped' => false,
                'attr' => [
                    'autocomplete' => 'new-password',
                    'placeholder'=>'Mot de passe :'
                    ],
                'constraints' => [
                    new NotBlank([
                        'message' => 'Please enter a password',
                    ]),
                    new Length([
                        'min' => 6,
                        'minMessage' => 'Your password should be at least {{ limit }} characters',
                        // max length allowed by Symfony for security reasons
                        'max' => 4096,
                    ]),
                ],
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
