import { p as publicAssetsURL } from './renderer.mjs';
import { defineComponent, ref, unref, mergeProps, useSSRContext } from 'vue';
import { u as useRoute } from './server.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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
import 'ohash';
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

const _imports_0 = "" + publicAssetsURL("question-img.png");
const _imports_1 = "" + publicAssetsURL("01.png");
const _imports_2 = "" + publicAssetsURL("02.png");
const _imports_3 = "" + publicAssetsURL("03.png");
const _imports_4 = "" + publicAssetsURL("04.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const question = ref({
      id: 0,
      name: "",
      displayOrder: 0,
      answers: []
    });
    ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(question).id == 0) {
        _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "col-12" }, _attrs))}><div class="row"><div class="col-6 text-white d-flex position-relative" style="${ssrRenderStyle([{ "background-color": unref(question).bgColor }, { "min-height": "500px" }])}"><img${ssrRenderAttr("src", _imports_0)} alt="" class="img-fluid position-absolute" style="${ssrRenderStyle({ "width": "700px", "left": "-320px", "bottom": "0" })}"><div class="my-auto" style="${ssrRenderStyle({ "padding-bottom": "100px" })}">`);
        if (unref(question).displayOrder == 1) {
          _push(`<img${ssrRenderAttr("src", _imports_1)} class="w-50 mt-5" style="${ssrRenderStyle({ "padding-left": "200px" })}" alt="01">`);
        } else {
          _push(`<!---->`);
        }
        if (unref(question).displayOrder == 2) {
          _push(`<img${ssrRenderAttr("src", _imports_2)} class="w-50 mt-5" style="${ssrRenderStyle({ "padding-left": "200px" })}" alt="01">`);
        } else {
          _push(`<!---->`);
        }
        if (unref(question).displayOrder == 3) {
          _push(`<img${ssrRenderAttr("src", _imports_3)} class="w-50 mt-5" style="${ssrRenderStyle({ "padding-left": "200px" })}" alt="01">`);
        } else {
          _push(`<!---->`);
        }
        if (unref(question).displayOrder == 4) {
          _push(`<img${ssrRenderAttr("src", _imports_4)} class="w-50 mt-5" style="${ssrRenderStyle({ "padding-left": "200px" })}" alt="01">`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h1 style="${ssrRenderStyle({ "padding-left": "200px" })}">${ssrInterpolate(unref(question).name)}</h1></div></div><div class="col-6 ps-4 d-flex"><div class="my-auto"><h3 style="${ssrRenderStyle({ "color": "#ED1C27" })}">Cocher la case correspondante</h3><!--[-->`);
        ssrRenderList(unref(question).answers, (answer) => {
          _push(`<div class="form-check mb-3 d-flex"><input class="form-check-input border border-3 me-3 my-auto" style="${ssrRenderStyle({ "border-radius": "0", "border-color": "#005EAD !important", "min-width": "30px", "max-width": "30px", "min-height": "30px", "max-height": "30px" })}" type="radio"${ssrRenderAttr("name", unref(question).id)}${ssrRenderAttr("id", answer.id)}${ssrRenderAttr("value", answer.name)}><label class="form-check-label fw-bold my-auto" style="${ssrRenderStyle({ "color": "#005EAD" })}"${ssrRenderAttr("for", answer.id)}>${ssrInterpolate(answer.name)}</label></div>`);
        });
        _push(`<!--]-->`);
        if (unref(question).displayOrder == 4) {
          _push(`<div class="text-decoration-underline fw-bold fs-4" style="${ssrRenderStyle({ "cursor": "pointer", "color": "#ED1C27" })}">Afficher les r\xE9sultats</div>`);
        } else {
          _push(`<div class="text-decoration-underline fw-bold fs-4 mt-5" style="${ssrRenderStyle({ "cursor": "pointer", "color": "#ED1C27" })}">Question suivante &gt;</div>`);
        }
        _push(`</div></div></div></div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[token]/quiz/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-d59767b0.mjs.map
