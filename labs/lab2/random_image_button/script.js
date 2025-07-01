    document.addEventListener('DOMContentLoaded', function() {
        const button = document.getElementById('randomPicButton');
        button.addEventListener('click', function() {
            const images = [
                "https://data.whicdn.com/images/15145864/large.jpg",
                "https://cdn0.vox-cdn.com/uploads/chorus_image/image/48151611/8559004265_4b81d299ce.0.0.jpg",
                "https://farm5.staticflickr.com/4060/4567292488_5d3f4b05f6_z.jpg"
            ];
            const randomIndex = Math.floor(Math.random() * images.length);
            const imageContainer = document.getElementById('image');
            imageContainer.innerHTML = `<img src="${images[randomIndex]}" alt="Random Image">`;
        });
    });
