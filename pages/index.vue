<script setup lang="ts">
let quizData = ref();

onMounted(async () => {
    await getData();
});

async function getData() {
    const quizFetch = useFetch('https://darty-fete-des-meres.dev-sandbox.fr/api/quizzes/1');
    await quizFetch.execute();
    quizData.value = quizFetch.data.value;
}

function generateToken(length = 12) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);
    let result = '';

    for (let i = 0; i < length; i++) {
        result += characters[randomValues[i] % characters.length];
    }

    return result;
}

async function checkToken() {
    if (useCookie('token').value) {
        const token = useCookie('token').value;
        let customerQuizFetch = {};


        try {
            customerQuizFetch = await useFetch('https://darty-fete-des-meres.dev-sandbox.fr/api/customer_quizzes/' + token);
            const customerQuiz = customerQuizFetch.data.value;
            if (!customerQuiz.currentQuestion) {
                navigateTo(`${token}/resultat`);
            } else {
                navigateTo(`${token}/quiz/${customerQuiz.currentQuestion.id}`);
            }
        } catch (err) {
            throw err;
        }

    } else {
        const token = generateToken();
        useCookie('token').value = token;
        postCustomerQuiz(token);
    }
}

function postCustomerQuiz(token: string) {
    try {
        useFetch('https://darty-fete-des-meres.dev-sandbox.fr/api/customer_quizzes', {
            method: 'POST',
            body: {
                quiz: 'https://darty-fete-des-meres.dev-sandbox.fr/api/quizzes/1',
                currentQuestion: 'https://darty-fete-des-meres.dev-sandbox.fr/api/questions/1',
                createdAt: new Date(),
                token: token
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        navigateTo(`${token}/quiz/1`);
    } catch (err) {
        throw err;
    }
}
</script>

<template>
    <NavBar/>

    <div class="col-12 mt-3 mt-sm-0">
        <img src="/banner-1.jpg" alt="Bannière" class="img-fluid mb-4">
    </div>
    <div class="col-12">
        <div class="row d-flex justify-content-evenly">

            <div v-if="quizData" v-for="profile in quizData.profiles" :key="profile.id" class="col-lg-2 col-6 py-sm-3 py-2 text-center fw-bold text-white">
                <template v-if="profile">
                    <div class="mb-3">
                        <img :src="'/picto-'+profile.id+'.png'" :alt="'Picto'+ profile.id" class="img-fluid" style="height:60px;">
                    </div>
                    <div class="py-3 h-50 d-flex flex-column" :style="{'background-color': profile.color}">
                        <p class="m-0 my-auto" v-if="profile.id == 4" style="color: #005EAD">WONDER MAMAN<br>{{ profile.name }} ?</p>
                        <p class="m-0 my-auto" :aria-label="profile.name" v-else>WONDER MAMAN<br>{{ profile.name }} ?</p>
                    </div>
                </template>
            </div>

            <div class="col-lg-4 col-6 py-3 d-flex mt-4 mt-sm-0">
                <div class="mt-auto mx-auto mb-2">
                    <button @click="checkToken()" class="btn text-white fw-bold px-4 px-sm-5 py-3" style="background-color:#ED1C27;">Je fais le test</button>
                </div>
            </div>
        </div>
    </div>
</template>