<script setup>
useHead({
    title: 'Darty - Opération Spéciale Fête des Mères',
    meta: [
        {name: 'description', content: 'Opération spéciale ! Trouver le cadeau idéal pour votre maman ! Du 22 mai au 04 juin'}
    ],
})
</script>

<template>
    <div class="container">
        <div class="row">
            <NuxtPage/>
        </div>
    </div>
</template>

<style>
@font-face {
    font-family: "Calvert";
    src: local("Calvert"),
    url(/Calvert.otf) format("truetype");
}

p, h1, h2, h3, h4, h5, h6, .btn, .fs-1, .fs-2, .fs-3, .fs-4, .fs-5, .fs-6, .fs-7, a, span {
    font-family: Calvert;
}
</style>