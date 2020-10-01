Feature: Test work
    Not registered user tries to authorize and gets error
    Registered can authorize succesfully
    Authorized user can edit profile settings

    Scenario: Not registered user opens Home page
        Given I am not registered user
        When I open Home page
        Then I should see Home page
        # Scenario: Not registered user clicks on "LOG IN" text
        # Given I am on the Home page
        When I click "LOG IN" text
        Then I should see Authorization page
        # Scenario: Not registered user enters credentials
        # Given I am on Authorization page
        When I enter credentials and click "eye" icon
        Then I should see entered password
        # Scenario: Not registered user clicks "Login" button
        # Given I have entered credentials
        When I click on "Login" button
        Then I should see error message

