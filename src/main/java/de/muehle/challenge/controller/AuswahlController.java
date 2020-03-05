package de.muehle.challenge.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AuswahlController {
	
	/*
	private final AuswahlRepository auswahlRepository;
	
	@Autowired
	public AuswahlController(AuswahlRepository auswahlRepository) {
		super();
		this.auswahlRepository = auswahlRepository;
	}
	*/
	
	@GetMapping({"/"})
	public String listGames (Model model) {

		return "auswahl";
	}
	
	@GetMapping({"/tetris"})
	public String tetrisAuswahl (Model model) {

		return "tetris";
	}
	
	
	@GetMapping({"/playtetris"})
	public String playTetris () {

		return "playtetris";
	}
	
	
	@GetMapping({"/muehle"})
	public String muehleSpiel (Model model) {

		return "muehle";
	}
	
	@GetMapping({"/muehle2"})
	public String muehleSpielA (Model model) {

		return "muehle2A";
	}
	
	
	@GetMapping({"/motorbike"})
	public String motorbike (Model model) {

		return "motorbike";
	}

	
	@GetMapping({"/pong"})
	public String pongGame (Model model) {

		return "pong";
	}
	
}





/*



@Controller
public class BookController {
	
	private final BookRepository bookRepository;
	
	@Autowired
	public BookController(BookRepository bookRepository) {
		super();
		this.bookRepository = bookRepository;
	}
	
	
	
	@GetMapping({"/books", "/"})
	public String listBooks (Model model) {
		model.addAttribute("books", bookRepository.findAll());
		return "books";
	}
	
	
	
	@GetMapping({"/book", "/book/{id}"})
	public String bookFormGet(
			Model model,
			@PathVariable (required = false) Long id) {

		Book book = new Book();
		if (id != null) {
			Optional<Book> bookOptional = bookRepository.findById(id);
			if (bookOptional.isPresent()) {
				book = bookOptional.get();
			}
		}
		model.addAttribute("book", book);
		return "book";
	}
	
	
	
	@PostMapping("/save") 
	public String saveBook (Model model, @ModelAttribute Book book) {
		
		Optional<Book> bookFromDBOptional = bookRepository.findByTitle(book.getTitle());
		// Prüft ob Buch mit gleichem Titel schon da ist!
		if (bookFromDBOptional.isPresent()) {
			model.addAttribute("message", "Please check your data. Book with the same title already existing:");
			model.addAttribute("books", bookRepository.findAll());
			return "books";
		} 
		bookRepository.save(book);
		return "redirect:/books";
	}
	
	
	
	@GetMapping("search")
	public String getSearchForm () {
		return "search";
	}
	
	
	
	@GetMapping("search-title")
	public String searchTitle (Model model, @RequestParam String title) {
		
		Optional<Book> bookOptional = bookRepository.findByTitle(title);
		if (bookOptional.isPresent()) {
			Book book = bookOptional.get();
			model.addAttribute("message", "Search successful!");
			model.addAttribute("book", book);
		} else {
			model.addAttribute("message", "No book found with this title!");
		}
		return "bookfound";
	}
	
	
	
	@GetMapping("search-author")
	public String searchAuthor(Model model, @RequestParam String author) {
		
		List<Book> books = bookRepository.findByAuthor(author);
		if (books.isEmpty()) {
			model.addAttribute("message", "No books found with this author!");
		} else {
			model.addAttribute("message", books.size() + " book(s) found:");
			model.addAttribute("books", books);
		}
		return "booksfound";
	}
	

}



/*
 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
}





























	@GetMapping({"/books", "/"})
	public String listBooks (Model model) {
		model.addAttribute("books", bookRepository.findAll());
		return "books";
	}



*/
