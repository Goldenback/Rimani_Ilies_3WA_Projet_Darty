import { p as publicAssetsURL } from './renderer.mjs';
import { defineComponent, ref, unref, mergeProps, useSSRContext, computed, reactive, toRef, getCurrentInstance, onServerPrefetch } from 'vue';
import { u as useRoute, n as navigateTo, a as useNuxtApp, c as createError } from './server.mjs';
import { hash } from 'ohash';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import 'vue-bundle-renderer/runtime';
import 'h3';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'defu';
import 'ufo';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'unctx';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const getDefault = () => null;
function useAsyncData(...args) {
  var _a2, _b, _c, _d, _e, _f;
  var _a;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = (_a2 = options.server) != null ? _a2 : true;
  options.default = (_b = options.default) != null ? _b : getDefault;
  options.lazy = (_c = options.lazy) != null ? _c : false;
  options.immediate = (_d = options.immediate) != null ? _d : true;
  const nuxt = useNuxtApp();
  const getCachedData = () => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key];
  const hasCachedData = () => getCachedData() !== void 0;
  if (!nuxt._asyncData[key]) {
    nuxt._asyncData[key] = {
      data: ref((_f = (_e = getCachedData()) != null ? _e : (_a = options.default) == null ? void 0 : _a.call(options)) != null ? _f : null),
      pending: ref(!hasCachedData()),
      error: toRef(nuxt.payload._errors, key)
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      if (opts.dedupe === false) {
        return nuxt._asyncDataPromises[key];
      }
      nuxt._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial && hasCachedData()) {
      return getCachedData();
    }
    asyncData.pending.value = true;
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((_result) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      var _a3;
      var _a22;
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      asyncData.error.value = error;
      asyncData.data.value = unref((_a3 = (_a22 = options.default) == null ? void 0 : _a22.call(options)) != null ? _a3 : null);
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = createError(asyncData.error.value);
      }
      delete nuxt._asyncDataPromises[key];
    });
    nuxt._asyncDataPromises[key] = promise;
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxt.hook("app:created", () => promise);
    }
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useRequestFetch() {
  var _a;
  const event = (_a = useNuxtApp().ssrContext) == null ? void 0 : _a.event;
  return (event == null ? void 0 : event.$fetch) || globalThis.$fetch;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _key = opts.key || hash([autoKey, unref(opts.baseURL), typeof request === "string" ? request : "", unref(opts.params || opts.query)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  const _request = computed(() => {
    let r = request;
    if (typeof r === "function") {
      r = r();
    }
    return unref(r);
  });
  if (!opts.baseURL && typeof _request.value === "string" && _request.value.startsWith("//")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch,
    immediate,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    watch: watch === false ? [] : [_fetchOptions, _request, ...watch || []]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const isLocalFetch = typeof _request.value === "string" && _request.value.startsWith("/");
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch && isLocalFetch) {
      _$fetch = useRequestFetch();
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
const _imports_0 = "" + publicAssetsURL("product-1.jpg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    let customerData = ref({});
    ref({
      lastName: "",
      firstName: "",
      email: "",
      phone: "",
      agreement: false,
      newsletter: false
    });
    ref([]);
    setTimeout(() => {
      getCustomerData();
    }, 1e3);
    async function getCustomerData() {
      const route = useRoute();
      const customerDataFetch = useFetch("https://darty-fete-des-meres.dev-sandbox.fr/api/customer_quizzes/" + route.params.token + ".json", "$Zlh0ZZUdAA");
      await customerDataFetch.execute();
      customerData.value = customerDataFetch.data.value;
      if (customerData.currentQuestion && route.params.id != customerData.currentQuestion.id) {
        navigateTo(`/${route.params.token}/quiz/${customerData.currentQuestion.id}`);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      if (!unref(customerData).profile) {
        _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "col-12 p-0" }, _attrs))}><div class="row"><div class="col-6 d-flex p-0 flex-column justify-content-center" style="${ssrRenderStyle({ "background-color": "#0960A5" })}"><img${ssrRenderAttr("src", "/profile-" + unref(customerData).profile.id + ".jpg")}${ssrRenderAttr("alt", unref(customerData).profile.name)} class="img-fluid"></div>`);
        if (unref(customerData).profile.id == 1) {
          _push(`<div class="col-6"><div class="row text-center"><div class="col-6"><div class="p-2 h-100" style="${ssrRenderStyle({ "background-color": "#0960A5" })}"><img${ssrRenderAttr("src", _imports_0)} alt="Produit 1" class="img-fluid w-100" style="${ssrRenderStyle({ "height": "200px", "object-fit": "cover" })}"><div><p class="text-white m-0 pt-2"> Smartphone<br> SAMSUNG GALAXY A34 128GO </p><a href="#" class="text-white pb-2">&gt; EN SAVOIR +</a></div></div></div><div class="col-6"><div class="p-2 h-100" style="${ssrRenderStyle({ "background-color": "#DD3E30" })}"><img${ssrRenderAttr("src", _imports_0)} alt="Produit 1" class="img-fluid w-100" style="${ssrRenderStyle({ "height": "200px", "object-fit": "cover" })}"><div><p class="text-white m-0 pt-2"> Bracelets connect\xE9s<br> XIOMI </p><a href="#" class="text-white pb-2">&gt; EN SAVOIR +</a></div></div></div></div><div class="row"><div class="col-12"><h3 class="text-center mt-3" style="${ssrRenderStyle({ "color": "#005EAD" })}">4 <span style="${ssrRenderStyle({ "color": "#ED1C27" })}">id\xE9es cadeaux</span> pour lui faire plaisir</h3><div class="border border-2 border-primary" style="${ssrRenderStyle({ "border-color": "#005EAD !important", "color": "#005EAD" })}"><p class="text-center my-2"> Sur <span style="${ssrRenderStyle({ "color": "#ED1C27" })}">darty.com</span>, avec le <span style="${ssrRenderStyle({ "color": "#ED1C27" })}">code PRIFDM5,</span><br> b\xE9n\xE9ficiez de <span style="${ssrRenderStyle({ "color": "#ED1C27" })}">5% de r\xE9duction en Carte Cadeau</span><br> sur cette s\xE9lection de produits </p></div></div></div><div class="row mt-3 text-center"><div class="col-6"><div class="p-2 h-100" style="${ssrRenderStyle({ "background-color": "#FFDD3B", "color": "#0960A5" })}"><img${ssrRenderAttr("src", _imports_0)} alt="Produit 1" class="img-fluid w-100" style="${ssrRenderStyle({ "height": "200px", "object-fit": "cover" })}"><div><p class="m-0 pt-2"> Casque audio<br> PHILIPS </p><a href="#" style="${ssrRenderStyle({ "color": "#0960A5" })}" class="pb-2">&gt; EN SAVOIR +</a></div></div></div><div class="col-6"><div class="p-2 h-100" style="${ssrRenderStyle({ "background-color": "#0960A5" })}"><img${ssrRenderAttr("src", _imports_0)} alt="Produit 1" class="img-fluid w-100" style="${ssrRenderStyle({ "height": "200px", "object-fit": "cover" })}"><div><p class="text-white m-0 pt-2"> V\xE9lo \xE9lectrique<br> PEUGEOT CITY E-LEGEND ARGENT </p><a href="#" class="text-white pb-2">&gt; EN SAVOIR +</a></div></div></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(customerData).profile.id == 2) {
          _push(`<div class="col-6"><div class="row text-center"><div class="col-6"><div class="p-2 h-100" style="${ssrRenderStyle({ "background-color": "#0960A5" })}"><img${ssrRenderAttr("src", _imports_0)} alt="Produit 1" class="img-fluid w-100" style="${ssrRenderStyle({ "height": "200px", "object-fit": "cover" })}"><div><p class="text-white m-0 pt-2"> Montre connect\xE9e<br> SAMSUNG GALAXY WATCH5 </p><a href="#" class="text-white pb-2">&gt; EN SAVOIR +</a></div></div></div><div class="col-6"><div class="p-2 h-100" style="${ssrRenderStyle({ "background-color": "#DD3E30" })}"><img${ssrRenderAttr("src", _imports_0)} alt="Produit 1" class="img-fluid w-100" style="${ssrRenderStyle({ "height": "200px", "object-fit": "cover" })}"><div><p class="text-white m-0 pt-2"> Liseuse eBook<br> KOBO </p><a href="#" class="text-white pb-2">&gt; EN SAVOIR +</a></div></div></div></div><div class="row"><div class="col-12"><h3 class="text-center mt-3" style="${ssrRenderStyle({ "color": "#005EAD" })}">4 <span style="${ssrRenderStyle({ "color": "#ED1C27" })}">id\xE9es cadeaux</span> pour lui faire plaisir</h3><div class="border border-2 border-primary" style="${ssrRenderStyle({ "border-color": "#005EAD !important", "color": "#005EAD" })}"><p class="text-center my-2"> Sur <span style="${ssrRenderStyle({ "color": "#ED1C27" })}">darty.com</span>, avec le <span style="${ssrRenderStyle({ "color": "#ED1C27" })}">code PRIFDM5,</span><br> b\xE9n\xE9ficiez de <span style="${ssrRenderStyle({ "color": "#ED1C27" })}">5% de r\xE9duction en Carte Cadeau</span><br> sur cette s\xE9lection de produits </p></div></div></div><div class="row mt-3 text-center"><div class="col-6"><div class="p-2 h-100" style="${ssrRenderStyle({ "background-color": "#FFDD3B", "color": "#0960A5" })}"><img${ssrRenderAttr("src", _imports_0)} alt="Produit 1" class="img-fluid w-100" style="${ssrRenderStyle({ "height": "200px", "object-fit": "cover" })}"><div><p class="m-0 pt-2"> Machine \xE0 pain<br> MOULINEX </p><a href="#" style="${ssrRenderStyle({ "color": "#0960A5" })}" class="pb-2">&gt; EN SAVOIR +</a></div></div></div><div class="col-6"><div class="p-2 h-100" style="${ssrRenderStyle({ "background-color": "#0960A5" })}"><img${ssrRenderAttr("src", _imports_0)} alt="Produit 1" class="img-fluid w-100" style="${ssrRenderStyle({ "height": "200px", "object-fit": "cover" })}"><div><p class="text-white m-0 pt-2"> V\xE9lo \xE9lectrique<br> PEUGEOT CITY E-LEGEND ARGENT </p><a href="#" class="text-white pb-2">&gt; EN SAVOIR +</a></div></div></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(customerData).profile.id == 3) {
          _push(`<div class="col-6"><div class="row text-center"><div class="col-6"><div class="p-2 h-100" style="${ssrRenderStyle({ "background-color": "#0960A5" })}"><img${ssrRenderAttr("src", _imports_0)} alt="Produit 1" class="img-fluid w-100" style="${ssrRenderStyle({ "height": "200px", "object-fit": "cover" })}"><div><p class="text-white m-0 pt-2"> Robot p\xE2tissier<br> KITCHEN COOK </p><a href="#" class="text-white pb-2">&gt; EN SAVOIR +</a></div></div></div><div class="col-6"><div class="p-2 h-100" style="${ssrRenderStyle({ "background-color": "#DD3E30" })}"><img${ssrRenderAttr("src", _imports_0)} alt="Produit 1" class="img-fluid w-100" style="${ssrRenderStyle({ "height": "200px", "object-fit": "cover" })}"><div><p class="text-white m-0 pt-2"> Cr\xEApi\xE8re<br> TEFAL </p><a href="#" class="text-white pb-2">&gt; EN SAVOIR +</a></div></div></div></div><div class="row"><div class="col-12"><h3 class="text-center mt-3" style="${ssrRenderStyle({ "color": "#005EAD" })}">4 <span style="${ssrRenderStyle({ "color": "#ED1C27" })}">id\xE9es cadeaux</span> pour lui faire plaisir</h3><div class="border border-2 border-primary" style="${ssrRenderStyle({ "border-color": "#005EAD !important", "color": "#005EAD" })}"><p class="text-center my-2"> Sur <span style="${ssrRenderStyle({ "color": "#ED1C27" })}">darty.com</span>, avec le <span style="${ssrRenderStyle({ "color": "#ED1C27" })}">code PRIFDM5,</span><br> b\xE9n\xE9ficiez de <span style="${ssrRenderStyle({ "color": "#ED1C27" })}">5% de r\xE9duction en Carte Cadeau</span><br> sur cette s\xE9lection de produits </p></div></div></div><div class="row mt-3 text-center"><div class="col-6"><div class="p-2 h-100" style="${ssrRenderStyle({ "background-color": "#FFDD3B", "color": "#0960A5" })}"><img${ssrRenderAttr("src", _imports_0)} alt="Produit 1" class="img-fluid w-100" style="${ssrRenderStyle({ "height": "200px", "object-fit": "cover" })}"><div><p class="m-0 pt-2"> Robot multifonction<br> MOULINEX </p><a href="#" style="${ssrRenderStyle({ "color": "#0960A5" })}" class="pb-2">&gt; EN SAVOIR +</a></div></div></div><div class="col-6"><div class="p-2 h-100" style="${ssrRenderStyle({ "background-color": "#0960A5" })}"><img${ssrRenderAttr("src", _imports_0)} alt="Produit 1" class="img-fluid w-100" style="${ssrRenderStyle({ "height": "200px", "object-fit": "cover" })}"><div><p class="text-white m-0 pt-2"> Extracteur de jus<br> MAGIMIX JUICE EXPERT 3 </p><a href="#" class="text-white pb-2">&gt; EN SAVOIR +</a></div></div></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(customerData).profile.id == 4) {
          _push(`<div class="col-6"><div class="row text-center"><div class="col-6"><div class="p-2 h-100" style="${ssrRenderStyle({ "background-color": "#0960A5" })}"><img${ssrRenderAttr("src", _imports_0)} alt="Produit 1" class="img-fluid w-100" style="${ssrRenderStyle({ "height": "200px", "object-fit": "cover" })}"><div><p class="text-white m-0 pt-2"> S\xE8che-cheveux<br> REMINGTON </p><a href="#" class="text-white pb-2">&gt; EN SAVOIR +</a></div></div></div><div class="col-6"><div class="p-2 h-100" style="${ssrRenderStyle({ "background-color": "#DD3E30" })}"><img${ssrRenderAttr("src", _imports_0)} alt="Produit 1" class="img-fluid w-100" style="${ssrRenderStyle({ "height": "200px", "object-fit": "cover" })}"><div><p class="text-white m-0 pt-2"> Brosse coiffante<br> REVLON </p><a href="#" class="text-white pb-2">&gt; EN SAVOIR +</a></div></div></div></div><div class="row"><div class="col-12"><h3 class="text-center mt-3" style="${ssrRenderStyle({ "color": "#005EAD" })}">4 <span style="${ssrRenderStyle({ "color": "#ED1C27" })}">id\xE9es cadeaux</span> pour lui faire plaisir</h3><div class="border border-2 border-primary" style="${ssrRenderStyle({ "border-color": "#005EAD !important", "color": "#005EAD" })}"><p class="text-center my-2"> Sur <span style="${ssrRenderStyle({ "color": "#ED1C27" })}">darty.com</span>, avec le <span style="${ssrRenderStyle({ "color": "#ED1C27" })}">code PRIFDM5,</span><br> b\xE9n\xE9ficiez de <span style="${ssrRenderStyle({ "color": "#ED1C27" })}">5% de r\xE9duction en Carte Cadeau</span><br> sur cette s\xE9lection de produits </p></div></div></div><div class="row mt-3 text-center"><div class="col-6"><div class="p-2 h-100" style="${ssrRenderStyle({ "background-color": "#FFDD3B", "color": "#0960A5" })}"><img${ssrRenderAttr("src", _imports_0)} alt="Produit 1" class="img-fluid w-100" style="${ssrRenderStyle({ "height": "200px", "object-fit": "cover" })}"><div><p class="m-0 pt-2"> Lisseur<br> SAINT ALGUE </p><a href="#" style="${ssrRenderStyle({ "color": "#0960A5" })}" class="pb-2">&gt; EN SAVOIR +</a></div></div></div><div class="col-6"><div class="p-2 h-100" style="${ssrRenderStyle({ "background-color": "#0960A5" })}"><img${ssrRenderAttr("src", _imports_0)} alt="Produit 1" class="img-fluid w-100" style="${ssrRenderStyle({ "height": "200px", "object-fit": "cover" })}"><div><p class="text-white m-0 pt-2"> Fer \xE0 boucler<br> BABYLISS </p><a href="#" class="text-white pb-2">&gt; EN SAVOIR +</a></div></div></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[token]/resultat/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-7889ae9d.mjs.map
