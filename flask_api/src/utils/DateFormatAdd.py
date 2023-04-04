import datetime

class DateFormatAdd():
    @classmethod
    def convert_date(cls, date_string):
        return datetime.datetime.strptime(date_string, '%d/%m/%Y').date()