function draw_graph(input, arrayOfSV, arrayOfEq) {
    var cnvs = document.getElementById("graph");
    var ctx = cnvs.getContext("2d");
    cnvs.style.backgroundColor = "#ffffff";
    // подписываем единичные отрезки и оси
    // почему не после того, как нарисуем их? потому что
    // ps потому, что после поворота осей возникают сложности перевернутым текстом
    // да, их можно развернуть назад, но так куда проще - сначала создать текст, а потом уже развернуть оси и рисовать
    // единичный отрезок на картинке - 50 px => тк 50/200 = 1/4, формула ниже
  
    // находим максимальное по модулю значение и отталкиваемся от него при построении графиков (оно соответствует 200 пикселям от начала отсчета)
    var max_SV = 0;
    var max_Eq = 0;
    for (var i = 0; i < arrayOfEq.length; i++) {
      if (max_SV < Math.abs(arrayOfSV[i])) {
        max_SV = Math.abs(arrayOfSV[i]);
      }
      if (max_Eq < Math.abs(arrayOfEq[i])) {
        max_Eq = Math.abs(arrayOfEq[i]);
      }
    }
    var x1 = (1 / 4) * max_SV;
    x1 = parseFloat(x1.toFixed(10));
    var y1 = (1 / 4) * max_Eq;
    y2 = parseFloat(y1.toFixed(10));
  
    ctx.font = "bold 12px arial";
    // ед. отрезки
    ctx.textAlign = "center";
    ctx.fillText(x1, 300, 248);
    ctx.textAlign = "center";
    ctx.fillText(y1, 250, 200);
  
    // подпись осей
    ctx.fillText(input.name_dependence1, 240, 15);
    ctx.fillText(input.name_sv1, 490, 245);
  
    ctx.transform(1, 0, 0, -1, 0, cnvs.height); // переворачиваем координаты canvas в привычный вид
    // рисуем границы холста
    var border = 500;
    ctx.strokeStyle = "black";
    ctx.rect(0, 0, border, border);
    ctx.stroke();
  
    // рисуем оси
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(0, border / 2);
    ctx.lineTo(border, border / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(border / 2, 0);
    ctx.lineTo(border / 2, border);
    ctx.stroke();
  
    // рисуем сетку
    // вертикальные линии
    ctx.strokeStyle = "grey";
    var s = 0;
    for (var i = 1; i < 10; i++) {
      s = i * 50;
      ctx.beginPath();
      ctx.moveTo(s, 0);
      ctx.lineTo(s, border);
      ctx.stroke();
    }
    // горизонтальные линии
    s = 0;
    for (var i = 1; i < 10; i++) {
      s = i * 50;
      ctx.beginPath();
      ctx.moveTo(0, s);
      ctx.lineTo(border, s);
      ctx.stroke();
    }
  
    // ставим точки
    var x, y;
  
    for (var i = 0; i < arrayOfEq.length; i++) {
      x = border / 2 + (arrayOfSV[i] * 200) / max_SV;
      y = border / 2 + (arrayOfEq[i] * 200) / max_Eq;
  
      //console.log(x, y);
      ctx.beginPath();
      ctx.fillStyle = "green";
      ctx.arc(x, y, 3, 0 * Math.PI, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }
  }
  function write_input_inf(input) {
    var textBack = document.getElementById("input_inf");
    textBack.style.backgroundColor = "#83978e"; // красим блок с текстом (с уже закругленными рамками)
    var text = "CONSTANTS:";
    var flag = 0;
    if (input.name_const1 != "") {
      text += "<br>" + input.name_const1 + " = " + input.value_const1;
      flag = 1;
    }
    if (input.name_const2 != "") {
      text += "<br>" + input.name_const2 + " = " + input.value_const2;
      flag = 1;
    }
    if (input.name_const3 != "") {
      text += "<br>" + input.name_const3 + " = " + input.value_const3;
      flag = 1;
    }
    if (flag == 0) {
      text = "";
    }
    text +=
      "<br>" +
      "<br>" +
      "EQUATION:" +
      "<br> " +
      input.name_dependence1 +
      " = " +
      input.value_dependence1;
    text +=
      "<br>" +
      "<br>" +
      "<-- " +
      input.name_dependence1 +
      "(" +
      input.name_sv1 +
      ") " +
      "dependence";
    document.getElementById("input_inf").innerHTML = text;
  }
  
  function fillTable(input, i, j, cols, rows, arrayOfEV, arrayOfSV, str3) {
    // функция заполнения ячейки с координатами (i, j)
    if (i == 0 && j == 0) return "No";
    else if (j == 0) return i;
    else if (i == 0) {
      if (j == 1) return input.name_sv1;
      else if (j == 2) return input.name_ev1;
      else if (input.name_const1 != "" && cols >= 5 && j == 3)
        return input.name_const1;
      else if (input.name_const2 != "" && cols >= 6 && j == 4)
        return input.name_const2;
      else if (input.name_const3 != "" && cols >= 7 && j == 5)
        return input.name_const3;
  
      return input.name_dependence1;
    } else {
      if (j == 1) return arrayOfSV[i - 1];
      else if (j == 2) return arrayOfEV[i - 1];
      else if (input.name_const1 != "" && cols >= 5 && j == 3)
        return input.value_const1;
      else if (input.name_const2 != "" && cols >= 6 && j == 4)
        return input.value_const2;
      else if (input.name_const3 != "" && cols >= 7 && j == 5)
        return input.value_const3;
  
      if (
        str3.indexOf(input.name_ev1) >= 0 &&
        str3.indexOf(input.name_sv1) >= 0
      ) {
        str3 = str3.replaceAll(input.name_ev1, arrayOfEV[i - 1]);
        str3 = str3.replaceAll(input.name_sv1, arrayOfSV[i - 1]);
      } else if (str3.indexOf(input.name_ev1) >= 0) {
        str3 = str3.replaceAll(input.name_ev1, arrayOfEV[i - 1]); // заменяем значение EV для текущего i
      } else if (str3.indexOf(input.name_sv1) >= 0) {
        str3 = str3.replaceAll(input.name_sv1, arrayOfSV[i - 1]);
      } else {
        alert("you didn't enter the variable into equation");
        location.reload();
      }
      var equation = math.eval(str3); // решение математического примера
      equation = parseFloat(equation.toFixed(10));
      return equation;
    }
  }
  function addTable(parent, cols, rows, input, arrayOfEV, arrayOfSV, str3) {
    var arrayOfEq = [];
    // функция создания таблицы в заданном dive (parent)
    var table = document.createElement("table"); // инициализируем таблицу
    table.style.backgroundColor = "#ffffff"; // красим фон таблицы в белый
    for (var i = 0; i < rows; i++) {
      var tr = document.createElement("tr"); // инициализируем ряд таблицы
  
      for (var j = 0; j < cols; j++) {
        var td = document.createElement("td"); // инициализируем строку таблицы
        var t = fillTable(input, i, j, cols, rows, arrayOfEV, arrayOfSV, str3); // в соотв. с координатами ячейки, получаем нужный текст
        var text = document.createTextNode(t);
        if (j == cols - 1 && i != 0) {
          arrayOfEq.push(t); // если последний столбец, то записываем эл-ты equation в соотв массив
        }
        td.appendChild(text);
  
        tr.appendChild(td); // добавляем строку в элемент столбца
      }
  
      table.appendChild(tr); // добавляем столбец со всеми строками в таблицу
    }
    parent.appendChild(table); // добавляем таблицу в родительский div
  
    write_input_inf(input); // вывод исходных данных
    draw_graph(input, arrayOfSV, arrayOfEq); // рисование графика
  }
  
  function processingData(input) {
    // рассчет кол-ва столбцов и строк таблицы
  
    // col - столбец
    // row - строка
    keys_arr = Object.keys(input);
    var flag = 0;
    var cnt_cols = 1;
    var cnt_rows = 1;
  
    // считаем столбики и обрабатываем ошибки неверно введенных данных
    for (var i = 0; i < keys_arr.length; i += 2) {
      if (input[keys_arr[i]] != "" && input[keys_arr[i + 1]] != "") {
        flag = 1;
        cnt_cols += 1;
      } else if (
        (input[keys_arr[i]] != "" && input[keys_arr[i + 1]] == "") ||
        (input[keys_arr[i]] == "" && input[keys_arr[i + 1]] != "")
      ) {
        alert("you entered excess value or forgot about one value");
        location.reload();
      }
    }
  
    if (flag == 0) {
      alert("you didn't enter any data");
      location.reload();
    } else if (input.name_sv1 == "") {
      alert("you didn't enter State Values");
      location.reload();
    } else if (input.name_ev1 == "") {
      alert("you didn't enter Experimental Values");
      location.reload();
    }
  
    // считаем строки
    // парсим experimental values
    // 1 случай: 1st_value 2nd_value ...
    // 2 случай: [start, finish, step]
    var str1 = input.value_ev1;
    var arrayOfEV = [];
    var arrayOfSV = [];
  
    if (str1.indexOf("[") >= 0) {
      str1 = str1.replace("[", "");
      str1 = str1.replace("]", "");
  
      if (str1.indexOf(",") >= 0) {
        str1 = str1.replace(",", ".");
      }
      str1 = str1.split(/(\s)/).filter((x) => x.trim().length > 0); // разбиваем строку по символам пустого пространства
      var str2 = str1.map(function (x) {
        // преобразуем все эл-ты массива в числа
        return Number(x);
      });
  
      if (str2.length != 3) {
        alert('you entered wrong expression in "EXPERIMENTAL VALUES"');
        location.reload();
      }
  
      var d = str2[0];
      while (d <= str2[1]) {
        arrayOfEV.push(d);
        d = parseFloat((d + str2[2]).toFixed(10)); // вместо d+=str[2] тут стоит такое сложное выражение, тк js не умеет правильно обращаться с числами с плавающей запятой
      }
      console.log(arrayOfEV);
      //console.log(arrayOfEV);
      cnt_rows += arrayOfEV.length;
    } else {
      if (str1.indexOf(",") >= 0) {
        str1 = str1.replace(",", ".");
      }
      str1 = str1.split(/(\s)/).filter((x) => x.trim().length > 0); // разбиваем строку по символам пустого пространства
      var arrayOfEV = str1.map(function (x) {
        // преобразуем все эл-ты массива в числа
        return Number(x);
      });
      cnt_rows += arrayOfEV.length;
    }
  
    // парсим state values
    var strn = input.value_sv1;
    if (strn.indexOf("[") >= 0) {
      strn = strn.replace("[", "");
      strn = strn.replace("]", "");
  
      if (strn.indexOf(",") >= 0) {
        strn = strn.replaceAll(",", ".");
      }
      strn = strn.split(/(\s)/).filter((x) => x.trim().length > 0); // разбиваем строку по символам пустого пространства
      var str2n = strn.map(function (x) {
        // преобразуем все эл-ты массива в числа
        return Number(x);
      });
  
      if (str2n.length != 3) {
        alert('you entered wrong expression in "EXPERIMENTAL VALUES"');
        location.reload();
      }
  
      var k = str2n[0];
      while (k <= str2n[1]) {
        arrayOfSV.push(k);
        k = parseFloat((k + str2n[2]).toFixed(10)); // вместо d+=str[2] тут стоит такое сложное выражение, тк js не умеет правильно обращаться с числами с плавающей запятой
      }
      console.log(arrayOfSV);
    } else {
      if (strn.indexOf(",") >= 0) {
        strn = strn.replaceAll(",", ".");
      }
      strn = strn.split(/(\s)/).filter((x) => x.trim().length > 0); // разбиваем строку по символам пустого пространства
      var arrayOfSV = strn.map(function (x) {
        // преобразуем все эл-ты массива в числа
        return Number(x);
      });
    }
  
    if (cnt_rows - 1 != arrayOfSV.length) {
      alert(
        "quantity of State elements != quantity of Experimental elements, which is impossible"
      );
      locarion.reload();
    }
  
    // парсим equation
    var str3 = input.value_dependence1;
    if (input.name_const1 != "") {
      // все константы должны называться с заглавной буквы, чтобы случайно не совпасть с стандартными мат функциями
      str3 = str3.replaceAll(input.name_const1, input.value_const1);
    }
    if (input.name_const2 != "") {
      str3 = str3.replaceAll(input.name_const2, input.value_const2);
    }
    if (input.name_const3 != "") {
      str3 = str3.replaceAll(input.name_const3, input.value_const3);
    }
    // str3 - строка исхдной зависимости с замененными кностантами
    // console.log(equation1);
    //console.log(math.eval('sin(45 deg)'));
    var table_1 = document.querySelector("#table_1");
    addTable(table_1, cnt_cols, cnt_rows, input, arrayOfEV, arrayOfSV, str3);
  }
  
  function inputFunc(e) {
    e.preventDefault(); // отмена стандартного сценария
  
    var formData = new FormData(e.target);
  
    e.target.reset(); // очищаем форму
    input_data = Object.fromEntries(formData);
    //console.log(Object.keys(input_data));
    processingData(input_data);
  }
  
  document.getElementById("myForm").addEventListener("submit", inputFunc);
  