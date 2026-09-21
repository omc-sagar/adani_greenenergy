const canvas = document.getElementById("ownershipDoughnutChart");
const ctx = canvas.getContext("2d");
const labelContainer = document.getElementById("ownershipLabelContainer");
const centerLogo = document.getElementById("ownershipCenterLogo");
const mobileLegend = document.getElementById("mobileLegend");

let data = "";
let animationProgress = 0;
const animationDuration = 1500;
let startTime = null;
let labelsCreated = false;
let sliceAngles = [];
let mobileLine = null;
$(document).ready(function () {
  $.ajax({
    url: "/handlers/greenenergyv1/getshareholdingdata.ashx",
    type: "GET",
    dataType: "json",
    success: function (fetchedData) {
      data = fetchedData;
      redrawChart();
    },
    error: function (xhr, status, error) {
      console.error("Error fetching chart data:", error);
    },
  });
  function resizeCanvas() {
    let size;
    if (window.innerWidth > 1400) size = 460;
    else if (window.innerWidth > 768) size = 360;
    else size = 280;
    canvas.width = size;
    canvas.height = size;
  }

  function drawAnimatedDoughnutChart(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    animationProgress = Math.min(elapsed / animationDuration, 1);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    const innerRadius = radius * 0.5;
    let startAngle = -Math.PI / 2;
    sliceAngles = [];

    data.forEach((item) => {
      const animatedValue = item.value * animationProgress;
      const sliceAngle = (2 * Math.PI * animatedValue) / 100;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.arc(
        centerX,
        centerY,
        innerRadius,
        startAngle + sliceAngle,
        startAngle,
        true,
      );
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();

      sliceAngles.push({ start: startAngle, end: startAngle + sliceAngle });

      if (animationProgress === 1) {
        const textRadius = (radius + innerRadius) / 2;
        const textX =
          centerX + Math.cos(startAngle + sliceAngle / 2) * textRadius;
        const textY =
          centerY + Math.sin(startAngle + sliceAngle / 2) * textRadius;

        ctx.fillStyle = item.circleTextColor;
        ctx.font = `${Math.max(canvas.width * 0.04, 14)}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.value + "%", textX, textY);

        if (!labelsCreated && window.innerWidth > 991)
          createLabelsAndConnections();
      }

      startAngle += sliceAngle;
    });

    if (animationProgress === 1) {
      setTimeout(() => centerLogo.classList.add("show"), 200);
      labelsCreated = true;
    }

    if (animationProgress < 1) requestAnimationFrame(drawAnimatedDoughnutChart);
  }

  // Desktop labels & connecting lines
  function createLabelsAndConnections() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    const innerRadius = radius * 0.7;

    let offset =
      window.innerWidth > 1400 ? 140 : window.innerWidth > 1100 ? 110 : 90;
    let labelYOffset =
      window.innerWidth > 1400 ? 30 : window.innerWidth > 1100 ? 25 : 20;
    let labelOffset =
      window.innerWidth > 1400 ? 300 : window.innerWidth > 1100 ? 280 : 260;

    let startAngle = -Math.PI / 2;
    const midAngles = data.map((item) => {
      const sliceAngle = (2 * Math.PI * item.value) / 100;
      const mid = startAngle + sliceAngle / 2;
      startAngle += sliceAngle;
      return mid;
    });

    data.forEach((item, index) => {
      const midAngle = midAngles[index];
      const textRadius = (radius + innerRadius) / 2;
      const lineStartX = centerX + Math.cos(midAngle) * textRadius;
      const lineStartY = centerY + Math.sin(midAngle) * textRadius;

      const finalX =
        Math.cos(midAngle) < 0 ? lineStartX - offset : lineStartX + offset;
      const finalY = lineStartY;

      // Line
      const line = document.createElement("div");
      line.className = "ownership-connection-line";
      const lineLength = Math.abs(finalX - lineStartX);
      line.style.left = Math.min(lineStartX, finalX) + "px";
      line.style.top = finalY + "px";
      line.style.width = lineLength + "px";
      labelContainer.appendChild(line);

      // Label
      const label = document.createElement("div");
      label.className = "ownership-label";
      const logo = document.createElement("div");
      logo.className = "ownership-label-logo";
      const logoImg = document.createElement("img");
      logoImg.src = item.logoImage;
      logo.appendChild(logoImg);
      const text = document.createElement("div");
      text.className = "ownership-label-text";
      text.innerText = item.label;
      label.appendChild(logo);
      label.appendChild(text);
      labelContainer.appendChild(label);

      label.style.left =
        (Math.cos(midAngle) < 0 ? finalX - labelOffset : finalX) + "px";
      label.style.top = finalY - labelYOffset + "px";
      label.style.flexDirection =
        Math.cos(midAngle) < 0 ? "row-reverse" : "row";

      setTimeout(
        () => {
          label.classList.add("show");
          line.classList.add("show");
        },
        index * 300 + 300,
      );
    });
  }

  function showMobileLegend(index) {
    mobileLegend.innerHTML = "";
    const item = data[index];

    const div = document.createElement("div");
    div.className = "legend-item";
    const img = document.createElement("img");
    img.src = item.logoImage;
    div.appendChild(img);
    const text = document.createElement("span");
    text.innerText = `${item.label} (${item.value}%)`;
    div.appendChild(text);
    mobileLegend.appendChild(div);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    const innerRadius = radius * 0.5;
    const midAngle = (sliceAngles[index].start + sliceAngles[index].end) / 2;
    const startX = centerX + (Math.cos(midAngle) * (radius + innerRadius)) / 2;
    const startY = centerY + (Math.sin(midAngle) * (radius + innerRadius)) / 2;

    const legendRect = div.getBoundingClientRect();
    const containerRect = mobileLegend.getBoundingClientRect();
    const endX = legendRect.left + legendRect.width / 2 - containerRect.left;
    const endY = legendRect.top - containerRect.top; // Top-center of image

    if (mobileLine) mobileLine.remove();

    mobileLine = document.createElement("div");
    mobileLine.style.position = "absolute";
    mobileLine.style.background = "rgba(0,0,0,0.3)";
    mobileLine.style.height = "2px";
    mobileLine.style.left = startX + "px";
    mobileLine.style.top = startY + "px";
    mobileLine.style.width = Math.hypot(endX - startX, endY - startY) + "px";
    mobileLine.style.transform = `rotate(${Math.atan2(endY - startY, endX - startX)}rad)`;
    mobileLine.style.transformOrigin = "0 0";
    mobileLine.style.zIndex = "5";
    document.querySelector(".pi-chart").appendChild(mobileLine);
  }

  // Mobile slice click
  canvas.addEventListener("click", (e) => {
    if (window.innerWidth > 991) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - canvas.width / 2;
    const y = e.clientY - rect.top - canvas.height / 2;
    const angle = Math.atan2(y, x);
    let adjustedAngle = angle < -Math.PI / 2 ? 2 * Math.PI + angle : angle;

    for (let i = 0; i < sliceAngles.length; i++) {
      const s = sliceAngles[i].start;
      const e = sliceAngles[i].end;
      if (adjustedAngle >= s && adjustedAngle <= e) {
        showMobileLegend(i);
        break;
      }
    }
  });

  // Redraw chart on resize
  function redrawChart() {
    startTime = null;
    animationProgress = 0;
    labelsCreated = false;
    labelContainer.innerHTML = "";
    mobileLegend.innerHTML = "";
    if (mobileLine) {
      mobileLine.remove();
      mobileLine = null;
    }
    resizeCanvas();
    requestAnimationFrame(drawAnimatedDoughnutChart);
  }

  window.addEventListener("resize", redrawChart);
  redrawChart();
});
