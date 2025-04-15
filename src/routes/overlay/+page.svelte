<script>
	import { browser } from '$app/environment';

	if (browser) {
		window.addEventListener('storage', () => {
			console.log(localStorage.getItem('left_pr'));
			console.log(localStorage.getItem('rght_pr'));
			console.log(localStorage.getItem('max_score'));
			console.log(localStorage.getItem('left_player'));
			console.log(localStorage.getItem('rght_player'));
			console.log(localStorage.getItem('left_score'));
			console.log(localStorage.getItem('right_score'));
			console.log(localStorage.getItem('left_flag'));
			console.log(localStorage.getItem('rght_flag'));
			console.log(localStorage.getItem('overlay_map'));
			console.log(localStorage.getItem('overlay_stage'));
		});
	}
</script>

<body class="size-full"> </body>
