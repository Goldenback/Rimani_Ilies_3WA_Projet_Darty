<script setup lang="ts">

let customerData = ref({});

setTimeout(() => {
    getCustomerData();
}, 1000);

async function getCustomerData() {
    const route = useRoute();
    const customerDataFetch = useFetch('https://darty-fete-des-meres.dev-sandbox.fr/api/customer_quizzes/' + route.params.token + '.json',);
    await customerDataFetch.execute();
    customerData.value = customerDataFetch.data.value;

    if (customerData.currentQuestion && route.params.id != customerData.currentQuestion.id) {
        navigateTo(`/${route.params.token}/quiz/${customerData.currentQuestion.id}`);
    }
}

onMounted(async () => {
    await getCustomerData();
});

// const customerDataForm = ref({
//     lastName: '',
//     firstName: '',
//     email: '',
//     phone: '',
//     agreement: false,
//     newsletter: false,
// });
// let errors = ref([]);
// async function patchCustomerData() {
//     const route = useRoute();
//     errors.value = [];
//
//     if (!customerDataForm.value.lastName) {
//         errors.value.push('Veuillez renseigner votre nom');
//     }
//     if (!customerDataForm.value.firstName) {
//         errors.value.push('Veuillez renseigner votre prénom');
//     }
//     if (!customerDataForm.value.email) {
//         errors.value.push('Veuillez renseigner votre email');
//     }
//     if (!customerDataForm.value.agreement) {
//         errors.value.push('Accepter les conditions générales');
//     } else {
//         try {
//             useFetch('https://darty-fete-des-meres.dev-sandbox.fr/api/customer_quizzes/' + route.params.token, {
//                 method: 'PATCH',
//                 body: {
//                     lastName: customerDataForm.value.lastName,
//                     firstName: customerDataForm.value.firstName,
//                     email: customerDataForm.value.email,
//                     phone: customerDataForm.value.phone,
//                     agreement: customerDataForm.value.agreement,
//                     newsletter: customerDataForm.value.newsletter,
//                 },
//                 headers: {
//                     'Content-type': 'application/merge-patch+json; charset=UTF-8',
//                 }
//             });
//
//             navigateTo(`/${route.params.token}/resultat`);
//         } catch (err) {
//             throw err;
//         }
//     }
// }

</script>

<template>
    <NavBar/>
    <div v-if="!customerData.profile">
        <!--        <Loader/>-->
    </div>
    <div v-else class="col-12 mb-5">
        <div class="row">
            <div class="col-lg-6 col-12 p-0 d-flex flex-column justify-content-center" style="background-color: #005EAD">
                <img :src="'/profile-'+customerData.profile.id+'.jpg'" :alt="customerData.profile.name" class="img-fluid">
            </div>

            <!--      MAMAN ZEN & ÉCOLO      -->
            <div v-if="customerData.profile.id == 1" class="col-lg-6 col-12 mt-4 mt-sm-0">
                <div class="row text-center">
                    <div class="col-6">
                        <div class="p-2 h-100" style="background-color: #005EAD">
                            <a href="https://www.darty.com/nav/achat/telephonie/telephone_mobile_seul/montre_connectee/samsung_gw5_40_bt_or_rose.html" target="_blank">
                                <img src="/product-5.jpg" alt="Montre connectée - SAMSUNG GALAXY WATCH 5" class="img-fluid w-100" style="height: 170px; object-fit: cover">
                            </a>
                            <div>
                                <p class="text-white m-0 pt-2">
                                    Montre connectée<br>
                                    <span class="fs-5">SAMSUNG GALAXY WATCH 5</span>
                                </p>
                                <a href="https://www.darty.com/nav/achat/telephonie/telephone_mobile_seul/montre_connectee/samsung_gw5_40_bt_or_rose.html" target="_blank" class="text-white pb-2">Offrir</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="p-2 h-100" style="background-color: #ED1C27">
                            <a href="https://www.darty.com/nav/achat/audio_mp3_mp4/book/book/kobo_libra_2_blanche.html" target="_blank">
                                <img src="/product-4.jpg" alt="Liseuse eBook - KOBO" class="img-fluid w-100" style="height: 170px; object-fit: cover">
                            </a>
                            <div>
                                <p class="text-white m-0 pt-2">
                                    Liseuse eBook<br>
                                    <span class="fs-5">KOBO</span>
                                </p>
                                <a href="https://www.darty.com/nav/achat/audio_mp3_mp4/book/book/kobo_libra_2_blanche.html" target="_blank" class="text-white pb-2">Offrir</a>
                            </div>
                        </div>
                    </div>
                </div>

                <CodeReduction/>

                <div class="row mt-3 text-center">
                    <div class="col-6">
                        <div class="p-2 h-100" style="background-color: #FFDE17; color: #005EAD">
                            <a href="https://www.darty.com/nav/achat/petit_electromenager/fait_maison/machine_pain/moulinex_ow220830.html" target="_blank">
                                <img src="/product-3.jpg" alt="Machine à pain - MOULINEX" class="img-fluid w-100" style="height: 170px; object-fit: cover">
                            </a>
                            <div>
                                <p class="m-0 pt-2">
                                    Machine à pain<br>
                                    <span class="fs-5">MOULINEX</span>
                                </p>
                                <a href="https://www.darty.com/nav/achat/petit_electromenager/fait_maison/machine_pain/moulinex_ow220830.html" target="_blank" style="color: #005EAD" class="pb-2">Offrir</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="p-2 h-100" style="background-color: #005EAD">
                            <a href="https://www.darty.com/nav/achat/sports_loisirs/glisse_urbaine/velos_electriques/peugeot_yqu5384609.html" target="_blank">
                                <img src="/product-2.jpg" alt="Vélo électrique - PEUGEOT CITY E-LEGEND" class="img-fluid w-100" style="height: 170px; object-fit: cover">
                            </a>
                            <div>
                                <p class="text-white m-0 pt-2">
                                    Vélo électrique<br>
                                    <span class="fs-5">PEUGEOT CITY E-LEGEND</span>
                                </p>
                                <a href="https://www.darty.com/nav/achat/sports_loisirs/glisse_urbaine/velos_electriques/peugeot_yqu5384609.html" target="_blank" class="text-white pb-2">Offrir</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--      MAMAN GASTRONOMIE      -->
            <div v-if="customerData.profile.id == 2" class="col-lg-6 col-12 mt-4 mt-sm-0">
                <div class="row text-center">
                    <div class="col-6">
                        <div class="p-2 h-100" style="background-color: #005EAD">
                            <a href="https://www.darty.com/nav/achat/petit_electromenager/robots_cuisine-robot/robot_patissier/kitchen_cook_revolve_red.html" target="_blank">
                                <img src="/product-15.jpg" alt="Robot pâtissier - KITCHEN COOK" class="img-fluid w-100" style="height: 170px; object-fit: cover">
                            </a>
                            <div>
                                <p class="text-white m-0 pt-2">
                                    Robot pâtissier<br>
                                    <span class="fs-5">KITCHEN COOK</span>
                                </p>
                                <a href="https://www.darty.com/nav/achat/petit_electromenager/robots_cuisine-robot/robot_patissier/kitchen_cook_revolve_red.html" target="_blank" class="text-white pb-2">Offrir</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="p-2 h-100" style="background-color: #ED1C27">
                            <a href="https://www.darty.com/nav/achat/petit_electromenager/cuisson_conviviale/crepiere/tefal_py55e8.html" target="_blank">
                                <img src="/product-14.jpg" alt="Crêpière - TEFAL" class="img-fluid w-100" style="height: 170px; object-fit: cover">
                            </a>
                            <div>
                                <p class="text-white m-0 pt-2">
                                    Crêpière<br>
                                    <span class="fs-5">TEFAL</span>
                                </p>
                                <a href="https://www.darty.com/nav/achat/petit_electromenager/cuisson_conviviale/crepiere/tefal_py55e8.html" target="_blank" class="text-white pb-2">Offrir</a>
                            </div>
                        </div>
                    </div>
                </div>

                <CodeReduction/>

                <div class="row mt-3 text-center">
                    <div class="col-6">
                        <div class="p-2 h-100" style="background-color: #FFDE17; color: #005EAD">
                            <a href="https://www.darty.com/nav/achat/petit_electromenager/preparation_culinaire/robot/moulinex_fp5421.html" target="_blank">
                                <img src="/product-13.jpg" alt="Robot multifonction - MOULINEX" class="img-fluid w-100" style="height: 170px; object-fit: cover">
                            </a>
                            <div>
                                <p class="m-0 pt-2">
                                    Robot multifonction<br>
                                    <span class="fs-5">MOULINEX</span>
                                </p>
                            </div>
                            <a href="https://www.darty.com/nav/achat/petit_electromenager/preparation_culinaire/robot/moulinex_fp5421.html" target="_blank" style="color: #0960A5" class="pb-2">Offrir</a>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="p-2 h-100" style="background-color: #005EAD">
                            <a href="https://www.darty.com/nav/achat/petit_electromenager/robots_cuisine/extracteur_jus/magimix_juice_expert_3_rouge.html" target="_blank">
                                <img src="/product-12.jpg" alt="Extracteur de jus - MAGIMIX JUICE EXPERT 3" class="img-fluid w-100" style="height: 170px; object-fit: cover">
                            </a>
                            <div>
                                <p class="text-white m-0 pt-2">
                                    Extracteur de jus<br>
                                    <span class="fs-5">MAGIMIX JUICE EXPERT 3</span>
                                </p>
                                <a href="https://www.darty.com/nav/achat/petit_electromenager/robots_cuisine/extracteur_jus/magimix_juice_expert_3_rouge.html" target="_blank" class="text-white pb-2">Offrir</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--      MAMAN SPORTIVE      -->
            <div v-if="customerData.profile.id == 3" class="col-lg-6 col-12 mt-4 mt-sm-0">
                <div class="row text-center">
                    <div class="col-6">
                        <div class="p-2 h-100" style="background-color: #005EAD">
                            <a href="https://www.darty.com/nav/achat/gps_communication/telephone_mobile/telephone_portable/samsung_a34_5g_128_go_noir.html" target="_blank">
                                <img src="/product-1.jpg" alt="Smartphone - SAMSUNG GALAXY A34" class="img-fluid w-100" style="height: 170px; object-fit: cover">
                            </a>
                            <div>
                                <p class="text-white m-0 pt-2">
                                    Smartphone<br>
                                    <span class="fs-5">SAMSUNG GALAXY A34</span>
                                </p>
                                <a href="https://www.darty.com/nav/achat/gps_communication/telephone_mobile/telephone_portable/samsung_a34_5g_128_go_noir.html" target="_blank" class="text-white pb-2">Offrir</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="p-2 h-100" style="background-color: #ED1C27">
                            <a href="https://www.darty.com/nav/achat/telephonie/bracelet_connecte/bracelets_connectes/xiaomi_miband7n.html" target="_blank">
                                <img src="/product-11.jpg" alt="Bracelets connectés - XIAOMI" class="img-fluid w-100" style="height: 170px; object-fit: cover">
                            </a>
                            <div>
                                <p class="text-white m-0 pt-2">
                                    Bracelets connectés<br>
                                    <span class="fs-5">XIAOMI</span>
                                </p>
                                <a href="https://www.darty.com/nav/achat/telephonie/bracelet_connecte/bracelets_connectes/xiaomi_miband7n.html" target="_blank" class="text-white pb-2">Offrir</a>
                            </div>
                        </div>
                    </div>
                </div>

                <CodeReduction/>

                <div class="row mt-3 text-center">
                    <div class="col-6">
                        <div class="p-2 h-100" style="background-color: #FFDE17; color: #005EAD">
                            <a href="https://www.darty.com/nav/achat/accessoires/casque_ecouteurs/casque_arceau/hu_tah8506bk.html" target="_blank">
                                <img src="/product-10.jpg" alt="Casque audio - PHILIPS" class="img-fluid w-100" style="height: 170px; object-fit: cover">
                            </a>
                            <div>
                                <p class="m-0 pt-2">
                                    Casque audio<br>
                                    <span class="fs-5">PHILIPS</span>
                                </p>
                                <a href="https://www.darty.com/nav/achat/accessoires/casque_ecouteurs/casque_arceau/hu_tah8506bk.html" target="_blank" style="color: #005EAD" class="pb-2">Offrir</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="p-2 h-100" style="background-color: #005EAD">
                            <a href="https://www.darty.com/nav/achat/sports_loisirs/glisse_urbaine/velos_electriques/peugeot_yqu5384609.html" target="_blank">
                                <img src="/product-2.jpg" alt="Vélo électrique - PEUGEOT CITY E-LEGEND" class="img-fluid w-100" style="height: 170px; object-fit: cover">
                            </a>
                            <div>
                                <p class="text-white m-0 pt-2">
                                    Vélo électrique<br>
                                    <span class="fs-5">PEUGEOT CITY E-LEGEND</span>
                                </p>
                                <a href="https://www.darty.com/nav/achat/sports_loisirs/glisse_urbaine/velos_electriques/peugeot_yqu5384609.html" target="_blank" class="text-white pb-2">Offrir</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--      MAMAN COQUETTE       -->
            <div v-if="customerData.profile.id == 4" class="col-lg-6 col-12 mt-4 mt-sm-0">
                <div class="row text-center">
                    <div class="col-6">
                        <div class="p-2 h-100" style="background-color: #005EAD">
                            <a href="https://www.darty.com/nav/achat/petit_electromenager/beaute_feminine-seche-cheveux/seche_cheveux/remington_d5720.html" target="_blank">
                                <img src="/product-9.jpg" alt="Sèche-cheveux - REMINGTON" class="img-fluid w-100" style="height: 170px; object-fit: cover">
                            </a>
                            <div>
                                <p class="text-white m-0 pt-2">
                                    Sèche-cheveux<br>
                                    <span class="fs-5">REMINGTON</span>
                                </p>
                                <a href="https://www.darty.com/nav/achat/petit_electromenager/beaute_feminine-seche-cheveux/seche_cheveux/remington_d5720.html" target="_blank" class="text-white pb-2">Offrir</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="p-2 h-100" style="background-color: #DD3E30">
                            <a href="https://www.darty.com/nav/achat/petit_electromenager/beaute_feminine-appareil_coiffer/brosse_cheveux/revlon_rvdr5298e_volumizer.html" target="_blank">
                                <img src="/product-8.jpg" alt="Brosse coiffante - REVLON" class="img-fluid w-100" style="height: 170px; object-fit: cover">
                            </a>
                            <div>
                                <p class="text-white m-0 pt-2">
                                    Brosse coiffante<br>
                                    <span class="fs-5">REVLON</span>
                                </p>
                                <a href="https://www.darty.com/nav/achat/petit_electromenager/beaute_feminine-appareil_coiffer/brosse_cheveux/revlon_rvdr5298e_volumizer.html" target="_blank" class="text-white pb-2">Offrir</a>
                            </div>
                        </div>
                    </div>
                </div>

                <CodeReduction/>

                <div class="row mt-3 text-center">
                    <div class="col-6">
                        <div class="p-2 h-100" style="background-color: #FFDD3B; color: #0960A5">
                            <a href="https://www.darty.com/nav/achat/petit_electromenager/beaute_feminine-appareil_coiffer/lisseur/saint_algue_demeliss_dreams.html" target="_blank">
                                <img src="/product-7.jpg" alt="Lisseur - SAINT ALGUE" class="img-fluid w-100" style="height: 170px; object-fit: cover">
                            </a>
                            <div>
                                <p class="m-0 pt-2">
                                    Lisseur<br>
                                    <span class="fs-5">SAINT ALGUE</span>
                                </p>
                                <a href="https://www.darty.com/nav/achat/petit_electromenager/beaute_feminine-appareil_coiffer/lisseur/saint_algue_demeliss_dreams.html" target="_blank" style="color: #005EAD" class="pb-2">Offrir</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="p-2 h-100" style="background-color: #005EAD">
                            <a href="https://www.darty.com/nav/achat/petit_electromenager/beaute_feminine-appareil_coiffer/fers_boucler/babyliss_curl_secret_c1900e.html" target="_blank">
                                <img src="/product-6.jpg" alt="Fer à boucler - BABYLISS" class="img-fluid w-100" style="height: 170px; object-fit: cover">
                            </a>
                            <div>
                                <p class="text-white m-0 pt-2">
                                    Fer à boucler<br>
                                    <span class="fs-5">BABYLISS</span>
                                </p>
                                <a href="https://www.darty.com/nav/achat/petit_electromenager/beaute_feminine-appareil_coiffer/fers_boucler/babyliss_curl_secret_c1900e.html" target="_blank" class="text-white pb-2">Offrir</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--
            <div class="col-12 mt-3" v-if="!customerData.agreement">
                <div class="card">
                    <div class="card-header">
                        <h5>Souhaitez-vous recevoir des news de la part de WonderMama ?</h5>
                    </div>
                    <div class="card-body">
                        <form action="" @submit.prevent>
                            <div v-for="error in errors" :key="error">
                                <p class="text-danger">{{ error }}</p>
                            </div>
                            <div class="mb-3">
                                <label for="lastName" class="form-label">Nom<span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="lastName" placeholder="Nom" required v-model="customerDataForm.lastName">
                            </div>
                            <div class="mb-3">
                                <label for="firstName" class="form-label">Prénom<span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="firstName" placeholder="Prénom" required v-model="customerDataForm.firstName">
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email<span class="text-danger">*</span></label>
                                <input type="email" class="form-control" id="email" placeholder="Email" required v-model="customerDataForm.email">
                            </div>
                            <div class="mb-3">
                                <label for="phone" class="form-label">Téléphone</label>
                                <input type="tel" class="form-control" id="phone" placeholder="Téléphone" v-model="customerDataForm.phone">
                            </div>
                            <div class="form-check form-check-inline">
                                <div class="mb-3 form-check">
                                    <label class="form-check-label" for="agreement">J'accepte les conditions générales</label>
                                    <input type="checkbox" class="form-check-input" id="agreement" required v-model="customerDataForm.agreement">
                                </div>
                            </div>
                            <div class="form-check form-check-inline">
                                <div class="mb-3 form-check">
                                    <label class="form-check-label" for="newsletter">Je m'inscris à la newsletter</label>
                                    <input type="checkbox" class="form-check-input" id="newsletter" v-model="customerDataForm.newsletter">
                                </div>
                            </div>
                            <button type="submit" @click="patchCustomerData()" class="btn btn-primary">Valider</button>
                        </form>
                    </div>
                </div>
            </div>
            -->
        </div>
    </div>
</template>
