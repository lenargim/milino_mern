export function prodboard (element, options) {

  options.host = options.host || window.location.host;
  options.environment = options.environment || "https://planner.prodboard.com";

  const frame = document.createElement("iframe");
  const mode = (options.host || "").indexOf('#') < 0 ? "hash" : "search";
  let src = options.environment + '/' + options.company + '/' + options.instance;

  const url_query = function (query) {
    query = query.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    const expr = "[\\?&]" + query + "=([^&#]*)";
    const regex = new RegExp(expr);
    const results = regex.exec(window.location.href);
    if (results !== null) {
      return results[1];
    } else {
      return false;
    }
  };

  const setState = function (state) {
    if (mode === "hash")
      window.location.hash = state;
    if (mode === "search") {

      let query = window.location.search || "";
      const hash = window.location.hash;
      const path = window.location.pathname;

      if (query.length && query[0] === '?')
        query = query.substr(1);
      const parts = query.split('&') || [];
      let exist = -1;
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        if (p.startsWith("prodboard=")) {
          exist = i;
        }
      }
      if (exist !== -1)
        parts[exist] = "prodboard=" + window.encodeURIComponent(state);
      else
        parts.push("prodboard=" + window.encodeURIComponent(state));
      query = '?' + parts.join("&");

      const url = path + query + hash;
      window.history.pushState({}, window.title, url);
    }
  };

  const getState = function () {
    if (mode === "hash")
      return (window.location.hash ?? "").replace(/^#/, "");
    if (mode === "search")
      return url_query("prodboard");
  };

  const initialState = getState();

  frame.setAttribute("src", src + (initialState ? ("#" + initialState) : ""));
  frame.setAttribute("allowFullscreen", "true");
  frame.setAttribute("allow", "clipboard-read; clipboard-write");
  //allow="clipboard-read; clipboard-write"
  frame.style.width = "100%";
  frame.style.height = "100%";
  frame.style.border = "none";
  element.appendChild(frame);

  const handlers = {};

  const processMessage = function (event) {

    const host = options.environment;
    if (event.origin !== host)
      return;

    if (event.data.command === 'redirect')
      window.location.href = event.data.payload;
    else if (event.data.command === 'set_state')
      setState(event.data.payload);
    else {
      const handler = handlers[event.data.command];
      if (handler)
        handler(event.data.payload)
    }
  };

  window.addEventListener("message", processMessage, false);

  return {

    signIn: function (token) {
      const win = frame.contentWindow;

      win.postMessage(
        { command: 'sign-in', payload: { token: token } },
        options.environment);
    },

    signOut: function () {
      const win = frame.contentWindow;

      win.postMessage(
        { command: 'sign-out' },
        options.environment);
    },

    load: function (guid, clone) {
      const win = frame.contentWindow;
      console.log(guid)
      win.postMessage(
        { command: 'load', payload: { guid: guid, clone: clone } },
        options.environment);
    },

    onInitCompleted: function(handler) {
      handlers['init-completed'] = handler;
    },

    send: function (command, payload) {
      const win = frame.contentWindow;
      win.postMessage(
        { command: command, payload: payload },
        options.environment);
    },

    handle: function (command, handler) {
      handlers[command] = handler;
    },
  };
}