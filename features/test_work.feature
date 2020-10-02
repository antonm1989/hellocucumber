Feature: Test work
    Not registered user tries to authorize and gets error
    Registered can authorize succesfully
    Authorized user can edit profile settings

    Scenario: Not registered user opens Home page
        Given I am not registered user
        When I open Home page
        Then I should see Home page
        And I should see button with LOG IN text
        When I click LOG IN text
        Then I should see Authorization page
        And I should see credentials inputs
        # When I enter credentials and click "eye" icon
        # Then I should see entered password
        # When I click on "Login" button
        # Then I should see error message

