<script setup lang="ts">

const route = useRoute();
const question = ref({
	id: 0,
	name: '',
	displayOrder: 0,
	answers: [],
});
const answerId = ref(0);

onMounted(async () => {
	await getData();
});

async function getData() {
	const quizFetch = useFetch('https://darty-fete-des-meres.dev-sandbox.fr/api/quizzes/1');
	const customerFetch = useFetch('https://darty-fete-des-meres.dev-sandbox.fr/api/customer_quizzes/' + route.params.token);
	await quizFetch.execute();
	await customerFetch.execute();
	const quizData = quizFetch.data.value;
	const customerData = customerFetch.data.value;

	if (customerData.currentQuestion && route.params.id != customerData.currentQuestion.id) {
		navigateTo(`/${route.params.token}/quiz/${customerData.currentQuestion.id}`);
	} else if (!customerData.currentQuestion) {
		navigateTo(`/${route.params.token}/resultat`);
	} else {
		question.value = quizData.questions.find(q => q.id === customerData.currentQuestion.id);
	}
}

function patchCustomerQuiz() {
	if (answerId.value !== 0) {
		try {
			useFetch('https://darty-fete-des-meres.dev-sandbox.fr/api/customer_answers', {
				method: 'POST',
				body: {
					answer: 'https://darty-fete-des-meres.dev-sandbox.fr/api/answers/' + answerId.value,
					customerQuiz: 'https://darty-fete-des-meres.dev-sandbox.fr/api/customer_quizzes/' + route.params.token,
				},
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				}
			});
			answerId.value = 0;

		} catch (err) {
			throw err;
		}

		if (question.value.displayOrder >= 4) {
			try {
				useFetch('https://darty-fete-des-meres.dev-sandbox.fr/api/customer_quizzes/' + route.params.token, {
					method: 'PATCH',
					body: {
						currentQuestion: null,
					},
					headers: {
						'Content-type': 'application/merge-patch+json; charset=UTF-8',
					}
				});

				navigateTo(`/${route.params.token}/resultat`);
			} catch (err) {
				throw err;
			}
		} else {
			try {
				let nextQuestion = question.value.displayOrder + 1;
				let token = route.params.token;
				useFetch('https://darty-fete-des-meres.dev-sandbox.fr/api/customer_quizzes/' + route.params.token, {
					method: 'PATCH',
					body: {
						currentQuestion: 'https://darty-fete-des-meres.dev-sandbox.fr/api/questions/' + nextQuestion,
					},
					headers: {
						'Content-type': 'application/merge-patch+json; charset=UTF-8',
					}
				});

				navigateTo(`/${token}/quiz/${nextQuestion}`);

			} catch (err) {
				throw err;
			}
		}
	}
}
</script>

<style scoped>
@media (max-width: 768px) {
	.question-container {
		max-height: 310px;
	}

	.question-bg-image {
		width: 200px;
		left: -40px;
		bottom: 0
	}

	.question-number {
		width: 150px;
		margin-bottom: 20px;
		margin-top: 25px
	}

	.question-label-container {
		padding-left: 150px;
	}
}

@media (min-width: 768px) {
	.question-container {
		min-height: 500px;
	}

	.question-bg-image {
		width: 300px;
		left: -80px;
		bottom: 0
	}

	.question-number {
		width: 150px;
		margin-bottom: 20px;
	}

	.question-label-container {
		padding-left: 200px;
	}
}
</style>

<template>
	<NavBar/>

	<div v-if="question.id == 0">

	</div>
	<div v-else class="col-12">
		<div class="row">
			<div class="col-12 col-sm-6 text-white d-flex position-relative question-container" :style="{'background-color': question.bgColor}">
				<img src="/question-img.png" alt="" class="img-fluid position-absolute question-bg-image">
				<div class="my-auto question-label-container" style="padding-bottom: 100px">
					<div>
						<img :src="'/0'+question.displayOrder+'.png'" class="mt-sm-5 question-number" :alt="question.displayOrder"/>
					</div>
					<div>
						<h1 v-if="question.id == 3" style="color: #005EAD">{{ question.name }}</h1>
						<h1 v-else>{{ question.name }}</h1>
					</div>
				</div>
			</div>
			<div class="col-12 col-sm-6 ps-3 d-flex mt-4 mt-sm-0">
				<div class="my-auto">
					<h4 style="color: #ED1C27">Cocher la case correspondante</h4>
					<div class="form-check mb-3 d-flex" v-for="answer in question.answers">
						<input
							class="form-check-input border border-3 me-3 my-auto"
							style="border-radius: 0; border-color: #005EAD !important; min-width: 30px;max-width: 30px; min-height: 30px; max-height: 30px;"
							type="radio"
							:name="question.id" :id="answer.id"
							:value="answer.name"
							@click="answerId = answer.id">
						<label class="form-check-label fw-bold my-auto" style="color: #005EAD" :for="answer.id">
							{{ answer.name }}
						</label>
					</div>
					<div v-if="question.displayOrder == 4" class="text-decoration-underline fw-bold fs-4 mb-5" style="cursor: pointer; color: #ED1C27" @click="patchCustomerQuiz()">Je découvre le résultat >></div>
					<div v-else class="text-decoration-underline fw-bold fs-4 mt-sm-5 mb-5" style="cursor: pointer; color: #ED1C27" @click="patchCustomerQuiz()">Question suivante ></div>
				</div>
			</div>
		</div>
	</div>
</template>