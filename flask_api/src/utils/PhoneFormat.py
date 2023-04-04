import re

class PhoneFormat():

    @classmethod
    def convert_phone(cls, phone):
        regex = r"^\(?\d{2}\)? ?\d{4,5}\-?\d{4}$"
        return bool(re.match(regex, phone))
