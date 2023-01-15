const long = Math.max(document.body.clientWidth, document.body.clientHeight);
const speed = 6;
const pointCount = long * 4;
const fov = 300;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = 'white';

class Point {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	render() {
		const scale = fov / (fov + this.z);
		const x = this.x * scale + canvas.width / 2;
		const y = this.y * scale + canvas.height / 2;

		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + scale, y);
		ctx.lineWidth = scale;
		ctx.stroke();

		this.move();
	}

	move() {
		this.z -= speed;
		if (this.z < -fov) {
			this.z = fov * 2;
		}
	}
}

const points = [];
for (let i = 0; i < pointCount; i++) {
	points.push(
		new Point(
			Math.random() * canvas.width - canvas.width / 2,
			Math.random() * canvas.height - canvas.height / 2,
			Math.random() * long - long / 2
		)
	);
}

(function render() {
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	points.forEach((point) => point.render());

	requestAnimationFrame(render);
})();
