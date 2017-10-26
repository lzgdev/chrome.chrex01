// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var __str_name_SaveFile = "BMs-u0.txt";

function __jui_BMs_Clean(ev) {
  chrome.extension.sendMessage({ msg: "BMs_Clean" });
}

function __jui_BMs_Save(ev) {
  chrome.extension.sendMessage({ msg: "BMs_Save", name_BM: __str_name_SaveFile });
}

document.addEventListener('DOMContentLoaded', () => {
  var btn_Tmp1;
  btn_Tmp1 = document.getElementById('_btn_BMs_cext');
  if (btn_Tmp1) {
    btn_Tmp1.addEventListener('click', function(evt) {
          chrome.tabs.create({ url: "chrome://extensions" });
    });
  }

  btn_Tmp1 = document.getElementById('_btn_BMs_clean');
  if (btn_Tmp1) {
    btn_Tmp1.addEventListener('click', __jui_BMs_Clean);
  }

  btn_Tmp1 = document.getElementById('_btn_BMs_save');
  if (btn_Tmp1) {
    btn_Tmp1.addEventListener('click', __jui_BMs_Save);
  }

  btn_Tmp1 = document.getElementById('_btn_BMs_load');
  if (btn_Tmp1) {
    btn_Tmp1.addEventListener('click', function(evt) {
          chrome.tabs.create({ url: "bms_load.html" });
    });
  }
});

