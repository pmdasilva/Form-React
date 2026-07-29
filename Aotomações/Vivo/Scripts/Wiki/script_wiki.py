import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By
load_dotenv()  # carrega o .env

class AcessoConfluence:
    def __init__(self):
        self.driver = webdriver.Edge()
        self.site = os.getenv("SITE")
        self.SENHA = os.getenv("SENHA")
        self.LOGIN = os.getenv("LOGIN")
        self.id_btn_avanced = "details-button"
        self.id_href_continue = "proceed-link"
        self.id_camp_email = "username-field"
        self.id_camp_password = "password-field"
        self.id_button_login = "login-button"

    def time_wait_window(self):
        self.driver.implicitly_wait(2)

    def open_window(self):
        # This method wiil opening this windown and waiting 2 seconds.
        self.driver.get(self.site)
        self.time_wait_window()

    def select_advanced_button(self):
        # This method select this advanced button.
        self.driver.find_element(By.ID, self.id_btn_avanced).click()

    def select_href_continue(self):
        # This method select this link where is the link continue.
        self.driver.find_element(By.ID, self.id_href_continue).click()

    def clear_input(self):
        # This method clear the fill if have some content in the camp.
        self.driver.clear()

    def fill_input_email(self):
        # This method insert the camp email of loginWiki:
        input_email = self.driver.find_element(By.ID, self.id_camp_email)
        input_email.send_keys(self.LOGIN)
        self.time_wait_window()

    def fill_input_user_password(self):
        # This method insert the camp password of loginWiki:
        input_password = self.driver.find_element(By.ID, self.id_camp_password)
        input_password.send_keys(self.SENHA)
        self.time_wait_window()

    def select_button_login(self):
        # This method slected this button login.
        self.driver.find_element(By.ID, self.id_button_login).click()

acesso = AcessoConfluence()
acesso.open_window()
acesso.select_advanced_button()
acesso.select_href_continue()
acesso.fill_input_email()
acesso.fill_input_user_password()
acesso.select_button_login()