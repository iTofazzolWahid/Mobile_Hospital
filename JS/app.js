const getEle = (id) => {
	const ele = document.getElementById(id);
	return ele;
};
/* ---Search Button Function--- */
const searchBtn = () => {
	getEle("result-found").innerText = "";
	fetch(
		`https://openapi.programming-hero.com/api/phones?search=${getEle(
			"input-field",
		).value.toLocaleLowerCase()}`,
	)
		.then((res) => res.json())
		.then((data) => display(data.data));
	getEle("spinner").classList.remove("d-none");
	getEle("card-div").innerHTML = "";
};

/* === fetch details === */
const fetchDetail = async (slug) => {
	const res = await fetch(
		` https://openapi.programming-hero.com/api/phone/${slug}`,
	);
	const data = await res.json();
	displayDetails(data.data);
};

/* === Tag maker function===*/
const makeTag = (tagName, className, parent) => {
	const tag = document.createElement(tagName);
	tag.classList.add(className);
	parent.appendChild(tag);
	return tag;
};

/*=== Display Details===*/

const displayDetails = (data) => {
	const mainDiv = getEle("details");
	mainDiv.innerHTML = "";
	const divDetailBodyLeft = makeTag("div", "detail-body-left", mainDiv);
	const divDetailBodyRight = makeTag("div", "detail-body-right", mainDiv);
	const img = makeTag("img", "detail-img", divDetailBodyLeft);
	const h3 = makeTag("h3", "details-h3", divDetailBodyLeft);
	const p1 = makeTag("p", "details-p1", divDetailBodyLeft);
	const p2 = makeTag("p", "details-p2", divDetailBodyLeft);
	const h41 = makeTag("h4", "details-h4", divDetailBodyRight);
	const div1 = makeTag("div", "div1", divDetailBodyRight);
	const p3 = makeTag("p", "details-p", div1);
	const p4 = makeTag("p", "details-p", div1);
	const p5 = makeTag("p", "details-p", div1);
	const p6 = makeTag("p", "details-p", div1);
	const p7 = makeTag("p", "details-p", div1);
	img.src = data.image;
	h3.innerText = data.name;
	p1.innerText = data.brand;
	p2.innerText = data.releaseDate ? data.releaseDate : "Relese date not found 🙄 ";
	h41.innerText = "MainFeatures";
	p3.innerText = `ChipSet: ${data.mainFeatures.chipSet}`;
	p4.innerText = `Display Size: ${data.mainFeatures.displaySize}`;
	p5.innerText = `Memory: ${data.mainFeatures.memory}`;
	p6.innerText = `Storage: ${data.mainFeatures.storage}`;
	p7.innerText = `Sensors: ${data.mainFeatures.sensors.toString()}.`;
	if (data.others) {
		const h42 = makeTag("h4", "details-h4", divDetailBodyRight);
		const div2 = makeTag("div", "div2", divDetailBodyRight);
		const p8 = makeTag("p", "details-p", div2);
		const p9 = makeTag("p", "details-p", div2);
		const p10 = makeTag("p", "details-p", div2);
		const p11 = makeTag("p", "details-p", div2);
		const p12 = makeTag("p", "details-p", div2);
		const p13 = makeTag("p", "details-p", div2);
		h42.innerText = `Others`;
		p8.innerText = data.others.Bluetooth
			? `Bluetooth: ${data.others.Bluetooth}`
			: "Not Found";
		p9.innerText = data.others.GPS ? `GPS: ${data.others.GPS}` : "Not Found";
		p10.innerText = data.others.NFC ? `NFC: ${data.others.NFC}` : "Not Found";
		p11.innerText = data.others.Radio
			? `Radio: ${data.others.Radio}`
			: "Not Found";
		p12.innerText = data.others.USB ? `USB: ${data.others.USB}` : "Not Found";
		p13.innerText = data.others.WLAN
			? `WLAN: ${data.others.WLAN}`
			: "Not Found";
	}
};
/* ===Display=== */
const display = (phonedata) => {
	const phones = phonedata.length;
	if (getEle("input-field").value === "") {
		getEle("input-field").value = "";
		getEle("result-found").innerText = "Please write something🤨";
		getEle("card-div").innerHTML = "";
	} else {
		getEle("input-field").value = "";
		getEle("card-div").style.display = "hidden";
		if (phones === 0) {
			getEle("result-found").innerText = `No Phone Found😂 `;
		} else if (phones <= 20) {
			getEle("result-found").innerText = `Showing ${phones} Phones`;
		} else {
			getEle("result-found").innerText = `Showing Results 20 Out of ${phones}`;
		}
		phonedata.slice(0, 20).forEach((phone) => {
			const divCol = makeTag("div", "col", getEle("card-div"));
			const divCard = makeTag("div", "card", divCol);
			const img = makeTag("img", "card-img-top", divCard);
			const divCardBody = makeTag("div", "card-body", divCard);
			const h3 = makeTag("h3", "card-title", divCardBody);
			const p1 = makeTag("p", "card-text", divCardBody);
			const button = makeTag("button", "detail-button", divCardBody);
			img.src = phone.image;
			h3.innerText = phone.phone_name;
	// for brand
			if (phone.brand === undefined) {
				p1.innerText = "Brand Not found";
			} else {
				p1.innerText = phone.brand;
			}
			button.innerText = "Details";
			button.onclick = () => fetchDetail(phone.slug);
		});
	}
	getEle("spinner").classList.add("d-none");
};

